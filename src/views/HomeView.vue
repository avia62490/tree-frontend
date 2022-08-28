<script>
  import axios from 'axios'
  export default {
    data: function () {
      return {
        message: "Welcome to your app!",
        posts: [],
        newPost: {}
      };
    },
    created: function () {
      this.indexPosts ();
    },
    methods: {
      indexPosts: function () {
        axios.get("/posts.json").then(response => {
          console.log(response.data);
          this.posts = response.data;
        })
      },
      createPost: function () {
        axios.post("/posts.json", this.newPost).then(response => {
          console.log(response.data);
          this.posts.push(response.data);
        })
      }
    },
  };
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <hr/>
    <p><b>Image URL: </b><input type="text" v-model="newPost.image_url" /></p>
    <p><b>Description: </b><input type="text" v-model="newPost.description" /></p>
    <p><b>Latitude: </b><input type="text" v-model="newPost.latitude" /></p>
    <p><b>Longitude: </b><input type="text" v-model="newPost.longitude" /></p>
    <p><b>User ID: </b><input type="text" v-model="newPost.user_id" /></p>
    <button v-on:click="createPost()">Create Post</button>
    <hr/>
    <div v-for="post in posts">
    <p>{{ post.image_url }}</p>
    <p>{{ post.description }}</p>
    <p><b>Latitude: </b>{{ post.latitude }}</p>
    <p><b>Longitude: </b>{{ post.longitude }}</p>
    <br/>
    <hr/>
    </div>>
  </div>
</template>

<style></style>
