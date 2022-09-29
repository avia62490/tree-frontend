<script>
  import axios from "axios";

  export default {
    data: function () {
      return {
        newUserParams: {},
        errors: [],
      };
    },
    methods: {
      submit: function () {
        axios
          .post("/users", this.newUserParams)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/login");
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      },
    },
  };
</script>

<template>
  <section class="signup-section" id="signup">
    <div class="container px-4 px-lg-5">
      <form v-on:submit.prevent="submit()">
        <div class="col-md-2"><h2 class="sign-up-text">Signup</h2></div>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div>
          <label class="sign-up-text">Name:</label>
          <input class="form-control" type="text" placeholder="Enter user name..." v-model="newUserParams.name" />
        </div>
        <div>
          <label class="sign-up-text">Email:</label>
          <input class="form-control" type="email" placeholder="Enter email address..." v-model="newUserParams.email" />
        </div>
        <div>
          <label class="sign-up-text">Password:</label>
          <input class="form-control" type="password" placeholder="Enter password..." v-model="newUserParams.password" />
        </div>
        <div>
          <label class="sign-up-text">Password confirmation:</label>
          <input class="form-control" type="password" placeholder="Confirm password..." v-model="newUserParams.password_confirmation" />
        </div>
        <br/>
        <div class="col-md-10 col-lg-8 mx-auto text-center">
          <input class="btn btn-primary" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  </section>
</template>

<style>
  .sign-up-text {
    color: white;
    background-color: #64a19d;
    align-content: center;
    align-items: center;
  }
</style>
