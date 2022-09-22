<script>
  import axios from 'axios';
  import mapboxgl from 'mapbox-gl';
    export default {
      data: function () {
        return {
          message: "Making new post!",
          newPost: {}
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
            console.log(lngLat)
          }
          
          marker.on('dragend', onDragEnd);
        }
      },
    };
  </script>
  
  <template>
    <div class="home">
      <h1>{{ message }}</h1>
      <div id='map' style='width: 640px; height: 600px;'></div>
      <pre id="coordinates" class="coordinates"></pre>
    </div>
    <div>
      
    </div>
  </template>
  
  <style>
    
  </style>