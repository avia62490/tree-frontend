<script>
  import axios from 'axios';
  import mapboxgl from 'mapbox-gl';
    export default {
      data: function () {
        return {
          message: "Making new post!",
          newPost: {},
          marker: {}
        };
      },
      mounted: function () {
        this.addPostData()
      },
      methods: {
        addPostData: function () {
        console.log("adding post")
        mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/light-v10', // style URL
            center: [-87.62, 41.87], // starting position [lng, lat]
            zoom: 10, // starting zoom
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
              'circle-radius': 3,
              'circle-stroke-width': 3,
              'circle-color': 'white',
              'circle-stroke-color': '#64a19d'
            }
          });
        });
         this.marker = new mapboxgl.Marker({
          draggable: true
          })
          .setLngLat([-87.62, 41.87])
          .addTo(map);
          
          
          
          this.marker.on('dragend', this.onDragEnd);
        },
        createPost() {
          var formData = new FormData();
            formData.append("longitude", this.newPost.longitude);
            formData.append("latitude", this.newPost.latitude);
            formData.append("description", this.newPost.description);
            formData.append("image", this.image);

          axios.post("http://localhost:3000/posts.json", formData, this.newPost).then(response => {
          console.log(response.data)
          this.$router.push("/");
          })
        },
        onDragEnd() {
            const lngLat = this.marker.getLngLat();
            console.log(lngLat.lng)
            console.log(lngLat.lat)
            this.newPost.longitude = lngLat.lng
            this.newPost.latitude = lngLat.lat
        },
        setFile: function(event) {
          if (event.target.files.length > 0) {
            this.image = event.target.files[0];
          }
        }
      },
    };
</script>
  
<template>
  <section class="about-section text-center" id="about">
    <h2 class="text-white mb-5">Drag marker to set location</h2>
    <div class="container px-4 px-lg-5">
      <div class="col-lg-10">
        <div id='map' class="mapDisplay"></div>
        <pre id="coordinates" class="coordinates"></pre>   
        <br/>     
      </div>
    </div>
  </section>
  <br/>
  <div class="container px-4 px-lg-5">
    <div class="col-md-10 col-lg-8 mx-auto text-center">
      <div class="row">Image: <input type="file" v-on:change="setFile($event)" ref="fileInput"></div>
      <div class="row">Longitude:<input class="form-control" type="text" v-model="newPost.longitude" /></div>
      <div class="row">Latitude:<input class="form-control" type="text" v-model="newPost.latitude" /></div>
      <div class="row">Description:<input class="form-control" type="text" v-model="newPost.description" /></div>
      <br/>
      <div class="row-auto"><button class="btn btn-primary" v-on:click="createPost">Create Post!</button></div>
    </div>
  </div>
  <br/>
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