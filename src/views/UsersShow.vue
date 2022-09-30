<script>
  import axios from 'axios';
  import mapboxgl from 'mapbox-gl';

  export default {
    data: function () {
      return {
        posts: []
      };
    },
    mounted: function () {
      this.makeMap ();
      this.userPostsIndex ();
    },
    methods: {
      makeMap: function() {
        const coordinates = document.getElementById('coordinates');
        mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/light-v10', // style URL
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
            data: `http://localhost:3000/users/${this.$route.params.id}`
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
      },
      userPostsIndex: function () {
        axios.get(`users/${this.$route.params.id}`).then(response => {
          console.log(response.data.features)
          this.posts = response.data.features
        })
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
      </div>
      <br/>
    </div>
  </section>
  <br />
  <section class="projects-section bg-light" id="projects">
    <div class="container px-4 px-lg-5" v-for="(post, index) in posts" v-bind:key="post.id">
        <br/>
        <div v-if="index % 2 === 0" class="row gx-0 mb-5 mb-lg-0 justify-content-center">
            <div class="col-lg-6"><img :src="post.properties.image"/></div>
            <div class="col-lg-6">
                <div class="bg-black text-center h-100 project">
                    <div class="d-flex h-100">
                        <div class="project-text w-100 my-auto text-center text-lg-left">
                            <p class="mb-0 text-white-50">{{ post.properties.description }}</p>
                            <hr class="d-none d-lg-block mb-0 ms-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div v-if="index % 2 !== 0" class="row gx-0 justify-content-center">
            <div class="col-lg-6"><img :src="post.properties.image"/></div>
            <div class="col-lg-6 order-lg-first">
                <div class="bg-black text-center h-100 project">
                    <div class="d-flex h-100">
                        <div class="project-text w-100 my-auto text-center text-lg-right">
                            <p class="mb-0 text-white-50">{{ post.properties.description }}</p>
                            <hr class="d-none d-lg-block mb-0 me-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br/>
  </section>
</template>

<style>

</style>
