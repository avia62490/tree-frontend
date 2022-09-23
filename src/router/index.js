import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import PostsShow from "../views/PostsShow.vue";
import PostsNew from "../views/PostsNew.vue";
import UsersShow from "../views/UsersShow.vue";

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')},
  { path: "/signup", name: "signup", component: SignupView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/logout", name: "logout", component: LogoutView },
  { path: "/posts/:id", name: "postsshow", component: PostsShow },
  { path: "/posts/new", name: "postsnew", component: PostsNew },
  { path: "/users/:id", name: "usersshow", component: UsersShow }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
