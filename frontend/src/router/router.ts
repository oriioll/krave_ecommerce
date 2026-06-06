import { createRouter, createWebHistory } from "vue-router";
import { userIsLogged } from "@/services/auth.fetcher.ts";
import HomeView from "../views/HomeView.vue";
import ProductView from "@/views/ProductView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ProfileView from "@/views/ProfileView.vue";
import CreateProductView from "@/views/CreateProductView.vue";
import RenderProductsToEditView from "@/views/RenderProductsToEditView.vue";
import EditProductView from "@/views/EditProductView.vue";

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
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
    },
    {
      path: "/create-product",
      name: "CreateProduct",
      component: CreateProductView,
    },
    {
      path: "/manage-products",
      name: "ManageProducts",
      component: RenderProductsToEditView,
    },
    {
      path: "/product/edit/:slug",
      name: "EditProduct",
      component: EditProductView,
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
  const guestAuthOnly = ["/login", "/register"];
  const loggedOnly = [
    "Profile",
    "CreateProduct",
    "ManageProducts",
    "EditProduct",
  ];
  if (authData.loggedIn === true) {
    //if user is logged and tries to enter to login or register
    if (guestAuthOnly.includes(to.path)) {
      return next("/profile");
    }
  } else {
    //if user isn't logged and tries to enter to profile
    if (loggedOnly.includes(to.path)) {
      return next("/home");
    }
  }
  next();
});

export default router;
