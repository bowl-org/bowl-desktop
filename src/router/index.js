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
      {
        path: "conversationinfo/:id",
        name: "conversationinfo",
        component: () => import("@/views/ConversationInfo.vue"),
        children: [
          {
            path: "groupinfo",
            name: "groupinfo",
            component: () => import("@/views/GroupInfo.vue"),
          },
          {
            path: "contactinfo",
            name: "contactinfo",
            component: () => import("@/views/ContactInfo.vue"),
          },
        ],
      },
      {
        path: "newconversation",
        name: "newconversation",
        component: () => import("@/views/NewConversation.vue"),
        children: [
          {
            path: "newgroup",
            name: "newgroup",
            component: () => import("@/views/NewGroup.vue"),
          },
          {
            path: "newcontact",
            name: "newcontact",
            component: () => import("@/views/NewContact.vue"),
          },
        ],
      },

      {
        path: "notification",
        name: "notification",
        component: () => import("@/views/NotificationView.vue"),
      },
    ],
  },
  {
    path: "/settings",
    name: "settings",
    component: TheSettingsView,
    children: [
      {
        path: "about",
        name: "about",
        component: () => import("@/views/AboutView.vue"),
      },
      {
        path: "security",
        name: "security",
        component: () => import("@/views/TheSecurity.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("@/views/TheProfile.vue"),
      },
    ],
  },
  //{
  //  path: "/about",
  //  name: "about",
  //  // route level code-splitting
  //  // this generates a separate chunk (about.[hash].js) for this route
  //  // which is lazy-loaded when the route is visited.
  //  component: () =>
  //    import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  //},
];

const router = createRouter({
  //mode: 'history',
  //history: createWebHashHistory(),
  history: createWebHistory(),
  routes,
});
//
//Redirect undefined paths
router.replace({ path: "*", redirect: "/" });

export default router;
