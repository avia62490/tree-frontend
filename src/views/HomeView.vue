<script>
  import axios from 'axios';
  import mapboxgl from 'mapbox-gl';

  export default {
    data: function () {
      return {
        message: "Welcome to your app!",
        posts: [],
        newPost: {},
        currentPost: {}
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
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-87.62, 41.87], // starting position [lng, lat]
            zoom: 6, // starting zoom
        });
        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style
        });
        map.on('load', () => {
          map.addSource('trees', {
            type: 'geojson',
            // Use a URL for the value for the `data` property.
            data: 'http://localhost:3000/posts'
          });
          
          map.addLayer({
            'id': 'trees-layer',
            'type': 'circle',
            'source': 'trees',
            'paint': {
              'circle-radius': 4,
              'circle-stroke-width': 2,
              'circle-color': 'red',
              'circle-stroke-color': 'white'
            }
          });

          map.on('click', 'trees-layer', (e) => {
            
            const coordinates = e.features[0].geometry.coordinates.slice();
            const user_name = e.features[0].properties.user_name;
            const image = e.features[0].properties.image;
            const post_id = e.features[0].properties.id;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(`<a href="/posts/${post_id}"><img src="${image}" width="200" /></a>
              <p><b>${user_name}</p>`)
              .addTo(map);
          });

          map.on('mouseenter', 'trees-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
          });

          map.on('mouseleave', 'trees-layer', () => {
              map.getCanvas().style.cursor = '';
          });

        });
      }
    },
  };
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <hr/>
    <div id='map' style='width: 640px; height: 600px;'></div>
    <pre id="coordinates" class="coordinates"></pre>
    <button onclick="window.location.href='/posts/new';">Add Post</button>
  </div>
</template>

<style>

</style>
