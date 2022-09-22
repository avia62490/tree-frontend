<script>
  import axios from 'axios';
  import mapboxgl from 'mapbox-gl';
    export default {
      data: function () {
        return {
          message: "This is a POST!",
          post: {}
        };
      },
      created: function () {
        this.postsShow();
      },
      mounted: function () {

      },
      methods: {
        postsShow: function() {
          axios.get(`/posts/${this.$route.params.id}.json`).then(response => {
            this.post = response.data
            this.makeMap();
          })
        },
        postEdit: function () {
          document.querySelector('#edit-post').showModal()
        },
        updatePost: function() {
          axios.patch(`http://localhost:3000/posts/${this.post.id}.json`, this.post).then(response => {
          console.log(response.data)
          })
        },
        makeMap: function() {
          const coordinates = document.getElementById('coordinates');
          mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY
          const postLng = parseFloat(this.post.longitude)
          const postLat = parseFloat(this.post.latitude)
        
          const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [postLng, postLat], // starting position [lng, lat]
            zoom: 13, // starting zoom
          });
          const marker = new mapboxgl.Marker({
          draggable: true
          })
          .setLngLat([postLng, postLat])
          .addTo(map);
        }
      },
    };
  </script>
  
  <template>
    <div class="home">
      <h1>{{ message }}</h1>
      <div>
        <img :src="post.image_url" />
        <p><b>{{ post.description }}</b></p>
      </div>
      <button v-on:click="postEdit">Edit Post</button>

      <dialog id="edit-post">
      <form method="dialog">
        <div id='map' style='width: 320px; height: 320px;'></div>
        <p><b>Description:</b> <input type="text" v-model="post.description" /></p>
        <p><b>Image URL:</b> <input type="text" v-model="post.image_url" /></p>
        <p><b>Longitude:</b> <input type="text" v-model="post.longitude" /></p>
        <p><b>Latitude:</b> <input type="text" v-model="post.latitude" /></p>
        <button v-on:click="updatePost()">Update Post</button>
        <button v-on:click="destroyProduct(currentProduct)">Delete Product</button>
        <button>Close</button>
      </form>
    </dialog>
    </div>
  </template>
  
  <style>
    img {
      width: 80%;
      height: auto;
    }
  </style>