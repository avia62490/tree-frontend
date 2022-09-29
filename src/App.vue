<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container px-4 px-lg-5">
          <a class="navbar-brand" href="/">Home</a>
          <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link" href="/signup">Sign Up</a></li>
                <li class="nav-item"><a class="nav-link" href="/login">Log In</a></li>
                <li class="nav-item"><a class="nav-link" href="/logout">Log Out</a></li>
              </ul>
          </div>
      </div>
  </nav>
  <router-view/>
   <!-- Footer-->
   <footer class="footer bg-black small text-center text-white-50"><div class="container px-4 px-lg-5">Copyright &copy; Your Website 2022</div></footer>
</template>

<style>

</style>
