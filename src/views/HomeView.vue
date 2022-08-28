<script>
  import axios from 'axios'
  export default {
    data: function () {
      return {
        message: "Welcome to your app!",
        posts: [],
        newPost: {},
        currentPost: {}
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
      },
      showPost: function (thePost) {
        console.log("sjowing post");
        this.currentPost = thePost;
        document.querySelector('#post-details').showModal();
      }
    },
  };
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <hr/>
    <!-- Create A Post -->
    <p><b>Image URL: </b><input type="text" v-model="newPost.image_url" /></p>
    <p><b>Description: </b><input type="text" v-model="newPost.description" /></p>
    <p><b>Latitude: </b><input type="text" v-model="newPost.latitude" /></p>
    <p><b>Longitude: </b><input type="text" v-model="newPost.longitude" /></p>
    <p><b>User ID: </b><input type="text" v-model="newPost.user_id" /></p>
    <button v-on:click="createPost()">Create Post</button>
    <hr/>
  <!-- Index Posts -->
    <div v-for="post in posts" v-bind:key="post.id">
    <img :src="post.image_url">
    <p>{{ post.description }}</p>
    <p><b>Latitude: </b>{{ post.latitude }}</p>
    <p><b>Longitude: </b>{{ post.longitude }}</p>
    <button v-on:click="showPost(post)">More Info</button>
    <br/>
    <hr/>
    <!-- Show Post (modal) -->
    <dialog id="post-details">
      <form method="dialog">
        <img :src= currentPost.image_url />
        <p><b>Latitude: </b>{{ currentPost.latitude }}</p>
        <p><b>Longitude: </b>{{ currentPost.longitude }}</p>
        <button>Close</button>
      </form>
    </dialog>
    </div>>
  </div>
</template>

<style></style>
