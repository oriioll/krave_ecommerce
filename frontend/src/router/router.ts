import { createRouter, createWebHistory } from "vue-router";
import { userIsLogged } from "@/services/auth.fetcher.ts";
import HomeView from "../views/HomeView.vue";
import ProductView from "@/views/ProductView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: HomeView,
    },
    {
      path: "/product/:slug",
      component: ProductView,
    },
    {
      path: "/login",
      component: LoginView,
    },
    {
      path: "/register",
      component: RegisterView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      console.log(to, from);
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to, _from, next) => {
  //check if userIsLogged to control authorization
  const authData = await userIsLogged();
  const guestOnly = ["/login", "/register"];
  if (authData.loggedIn === true) {
    //if user is logged and tries to enter to login or register
    if (guestOnly.includes(to.path)) {
      //goes /home -> change to /profile
      return next("/home");
    }
  }
  next();
});

export default router;
