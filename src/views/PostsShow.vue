<script>
  import axios from 'axios'
    export default {
      data: function () {
        return {
          message: "This is a POST!",
          post: {}
        };
      },
      created: function () {
        this.postsShow()
      },
      methods: {
        postsShow: function() {
          console.log("showing post")
          axios.get(`/posts/${this.$route.params.id}.json`).then(response => {
            console.log(response.data);
            this.post = response.data;
          })
        },
        postEdit: function () {
          console.log("updating post")
          document.querySelector('#edit-post').showModal()
        },
        updatePost: function() {
          console.log('updating product...')
          axios.patch(`http://localhost:3000/posts/${this.post.id}.json`, this.post).then(response => {
          console.log(response.data)
          })
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