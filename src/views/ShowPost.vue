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
        <p><b>{{ post }}</b></p>

      </div>
    </div>
  </template>
  
  <style></style>