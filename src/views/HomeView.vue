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
            const description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
           while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML("hello world!!")
                .addTo(map);
        });

        map.on('mouseenter', 'trees-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'trees-layer', () => {
            map.getCanvas().style.cursor = '';
        });

        });
      },
      indexPosts: function () {
        axios.get("/posts.json").then(response => {
          console.log(response.data);
          this.posts = response.data;
          console.log(response.data.features[0].geometry.coordinates);
        })
      },
      createPost: function () {
        axios.post("/posts.json", this.newPost).then(response => {
          console.log(response.data);
          this.posts.push(response.data);
        })
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

    <!-- Create A Post -->
    <!-- <p><b>Image URL: </b><input type="text" v-model="newPost.image_url" /></p>
    <p><b>Description: </b><input type="text" v-model="newPost.description" /></p>
    <p><b>Latitude: </b><input type="text" v-model="newPost.latitude" /></p>
    <p><b>Longitude: </b><input type="text" v-model="newPost.longitude" /></p>
    <p><b>User ID: </b><input type="text" v-model="newPost.user_id" /></p>
    <button v-on:click="createPost()">Create Post</button>
    <hr/> -->

    <div id='map' style='width: 640px; height: 600px;'></div>
  <!-- Index Posts -->
    <!-- <div v-for="post in posts" v-bind:key="post.id">
    <p>{{ post.image_url }}</p>
    <p>{{ post.description }}</p>
    <button v-on:click="showPost(post)">More Info</button>
    <br/>
    <hr/> -->

    <!-- Show Post (modal) -->
    <!-- <dialog id="post-details">
      <form method="dialog">
        <img :src= currentPost.image_url width="480" height="360"/>
        <p>{{ currentPost.description }}</p>
        <p><b>Latitude: </b>{{ currentPost.latitude }}</p>
        <p><b>Longitude: </b>{{ currentPost.longitude }}</p>
        <hr/>
        <hr/>
        <p>Update Post here</p>
        <p>image url: <input type="text" v-model="currentPost.image_url"/></p>
        <p>description: <input type="text" v-model="currentPost.description"/></p>
        <p>latitude: <input type="text" v-model="currentPost.latitude"/></p>
        <p>longitude: <input type="text" v-model="currentPost.longitude"/></p>
        <button v-on:click="updatePost()">Update</button>
        <button>Close</button>
      </form>
    </dialog>
    </div> -->
  </div>
</template>

<style>
  
</style>
