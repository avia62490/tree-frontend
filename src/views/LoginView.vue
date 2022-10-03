<script>
  import axios from "axios";
  export default {
    data: function () {
      return {
        newSessionParams: {},
        errors: [],
      };
    },
    methods: {
      submit: function () {
        axios
          .post("/sessions", this.newSessionParams)
          .then((response) => {
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
            localStorage.setItem("jwt", response.data.jwt);
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error.response);
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          });
      },
    },
  };
</script>

<template>
  <section class="signup-section" id="signup">
    <div class="container px-4 px-lg-5">
      <form v-on:submit.prevent="submit()">
        <div class="col-md-2"><h1 class="login-text">Log in</h1></div>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div>
          <label class="login-text">Email:</label>
          <input class="form-control" type="email" placeholder="Enter email address..." v-model="newSessionParams.email" />
        </div>
        <div>
          <label class="login-text">Password:</label>
          <input class="form-control" type="password" placeholder="Enter password..." v-model="newSessionParams.password" />
        </div>
        <div class="col-md-10 col-lg-8 mx-auto text-center">
          <input class="btn btn-primary" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  </section>
</template>

<style>
  .login-text {
    color: white;
    background-color: #64a19d;
    align-content: center;
    align-items: center;
  }
</style>
