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
        postUpdate: function () {
          console.log("updating post")
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
    </div>
  </template>
  
  <style>
    img {
      width: 80%;
      height: auto;
    }
  </style>