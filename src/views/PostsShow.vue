<script>
  import axios from 'axios';
  import mapboxgl from 'mapbox-gl';
  export default {
    data: function () {
      return {
        message: "This is a POST!",
        post: {},
        marker: {}
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
      deleteWarning: function() {
        document.querySelector('#warning').showModal()
      },
      deletePost: function() {
        axios.delete(`/posts/${this.post.id}`).then(response => {
          console.log(response.data)
          this.$router.push("/");
        })
      },
      makeMap: function() {
        const coordinates = document.getElementById('coordinates');
        mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY
        const postLng = parseFloat(this.post.longitude)
        const postLat = parseFloat(this.post.latitude)
      
        const map = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/light-v10', // style URL
          center: [postLng, postLat], // starting position [lng, lat]
          zoom: 13, // starting zoom
        });
        this.marker = new mapboxgl.Marker({
        draggable: true
        })
        .setLngLat([postLng, postLat])
        .addTo(map);

        this.marker.on('dragend', this.onDragEnd);
      },
      onDragEnd() {
        const lngLat = this.marker.getLngLat();
        console.log(lngLat.lng)
        console.log(lngLat.lat)
        this.post.longitude = lngLat.lng
        this.post.latitude = lngLat.lat
      }
    },
  };
</script>
  
<template>
  <section class="about-section text-center" id="about">
    <div class="container px-4 px-lg-5">
      <div class="col-lg-10">
        <img :src="post.image_url" />
      </div>
      <br/>
      <p class="description-text"><b>{{ post.description }}</b></p>
      <button class="btn btn-primary" v-on:click="postEdit">Edit Post</button>
    </div>
    <br/>
  </section>

  <dialog id="edit-post">
    <form method="dialog">
      <div id='map' class="mapDisplay"></div>
      <p><b>Description:</b> <input type="text" v-model="post.description" /></p>
      <p><b>Image URL:</b> <input type="text" v-model="post.image_url" /></p>
      <p><b>Longitude:</b> <input type="text" v-model="post.longitude" /></p>
      <p><b>Latitude:</b> <input type="text" v-model="post.latitude" /></p>
      <button class="btn btn-primary" v-on:click="updatePost()">Update Post</button>
      <button class="btn btn-light">Close</button>
      <button class="btn btn-danger" v-on:click="deleteWarning()">Delete Post</button>
    </form>
  </dialog>

  <dialog id="warning">
    <form method="dialog">
      <p>Do you want to delete this post?</p>
      <button class="btn btn-light">No</button>
      <button class="btn btn-danger" v-on:click="deletePost()">Yes</button>
    </form>
  </dialog>

</template>

<style>
  .mapDisplay {
    width: 100%;
    height: 80%;
  }
  img {
    width: 80%;
    height: auto;
  }
  .description-text {
    color:#64a19d;
  }
</style>