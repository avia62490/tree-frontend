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
      this.indexPosts();
    },
    methods: {
      makeMap: function() {
        console.log("makking map");
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
            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const user_name = e.features[0].properties.user_name;
            const image = e.features[0].properties.image;
            const post_id = e.features[0].properties.id;
            console.log(coordinates)
            console.log(post_id)

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
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
      },
      indexPosts: function () {
        axios.get("/posts.json").then(response => {
          console.log(response.data);
          this.posts = response.data;
        })
      },
      postsCreate: function () {
        console.log("adding post")
        mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-87.62, 41.87], // starting position [lng, lat]
            zoom: 6, // starting zoom
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
        });
        const marker = new mapboxgl.Marker({
          draggable: true
          })
          .setLngLat([-87.62, 41.87])
          .addTo(map);
          
          function onDragEnd() {
          const lngLat = marker.getLngLat();
          coordinates.style.display = 'block';
          coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
          }
          
          marker.on('dragend', onDragEnd);
      },
      showPost: function (thePost) {
        console.log("sjowing post");
        this.currentPost = thePost;
        document.querySelector('#post-details').showModal();
      },
      updatePost: function () {
        axios.patch(`/posts/${this.currentPost.id}.json`, this.currentPost).then(response => {
          console.log(response.data)
        })
        console.log(`updating post ${this.currentPost.id}`)
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
    <button v-on:click="postsCreate()">Add Post</button>
  </div>
</template>

<style>
  .coordinates {
background: rgba(0, 0, 0, 0.5);
color: #fff;
position: absolute;
bottom: 40px;
left: 10px;
padding: 5px 10px;
margin: 0;
font-size: 11px;
line-height: 18px;
border-radius: 3px;
display: none;
}
</style>
