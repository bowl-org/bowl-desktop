import { createRouter, createWebHistory } from "vue-router";
import SignUp from "@/views/SignUp.vue";
import LogIn from "@/views/LogIn.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import MainView from "@/views/MainView.vue";
import UserView from "@/views/UserView.vue";
import TheSettingsView from "@/views/TheSettingsView.vue";

const routes = [
  {
    path: "/",
    name: "userview",
    component: UserView,
    children: [
      {
        path: "/",
        name: "default",
        component: LogIn,
      },
      {
        path: "/login",
        name: "login",
        component: LogIn,
      },
      {
        path: "/signup",
        name: "signup",
        component: SignUp,
      },
      {
        path: "/forgotpassword",
        name: "forgotpassword",
        component: ForgotPassword,
      },
    ],
  },
  {
    path: "/main",
    name: "main",
    component: MainView,
    children: [
      {
        path: "chat/:id",
        name: "chat",
        component: () => import("@/views/TheChat.vue"),
      },
    ],
  },
  {
    path: "/settings",
    name: "settings",
    component: TheSettingsView
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  //mode: 'history',
  //history: createWebHashHistory(),
  history: createWebHistory(),
  routes,
});
//
//Redirect undefined paths 
router.replace({path: '*', redirect: '/'})

export default router;
