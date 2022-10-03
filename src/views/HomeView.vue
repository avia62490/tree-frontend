<script>
  import mapboxgl from 'mapbox-gl';
  export default {
    data: function () {
      return {
      };
    },
    mounted: function () {
      this.makeMap ();
    },
    methods: {
      makeMap: function() {
        const coordinates = document.getElementById('coordinates');
        mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/light-v10', // style URL
            center: [-87.62, 41.87], // starting position [lng, lat]
            zoom: 10, // starting zoom
        });
        // Access user created posts for map locations
        map.on('load', () => {
          map.addSource('trees', {
            type: 'geojson',
            data: 'http://localhost:3000/posts'
          });
          // Adds layer over the map display corresponding to each post
          map.addLayer({
            'id': 'trees-layer',
            'type': 'circle',
            'source': 'trees',
            'paint': {
              'circle-radius': 3,
              'circle-stroke-width': 3,
              'circle-color': 'white',
              'circle-stroke-color': '#64a19d'
            }
          });
          // Defines what happens when user clicks on a point from the 'trees-layer'(the points on the map)
          map.on('click', 'trees-layer', (e) => {
            // Obtains key data from each post to be referenced in other actions
            const coordinates = e.features[0].geometry.coordinates.slice();
            const user_name = e.features[0].properties.user_name;
            const image = e.features[0].properties.image;
            const post_id = e.features[0].properties.id;
            const user_id = e.features[0].properties.user_id;
            // Pop-up box will appear when clicked on
            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(`<a href="/posts/${post_id}"><img src="${image}" width="200" /></a>
              <a href="/users/${user_id}"><p><b>${user_name}</p></a>`)
              .addClassName('popup')
              .addTo(map);
          });
          // Cursor turns changes style when hovering over post location on map
          map.on('mouseenter', 'trees-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
          });
          // Cursor changes back when it is no longer on post location
          map.on('mouseleave', 'trees-layer', () => {
              map.getCanvas().style.cursor = '';
          });
        });
      }
    },
  };
</script>

<template>
  <section class="about-section text-center" id="about">
    <div class="container px-4 px-lg-5">
      <div class="col-lg-10">
        <div id='map' class="mapDisplay"></div>
        <pre id="coordinates" class="coordinates"></pre>   
        <br/>
        <a class="btn btn-primary" href="/posts/new">Create Post</a>
      </div>
      <br/>
    </div>
  </section>
</template>

<style>
  .mapDisplay {
    min-width: 600px;
    min-height: 600px;
    width: 100%;
    height: 80%;
  }
</style>
