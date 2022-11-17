import { createRouter, createWebHashHistory } from 'vue-router'
import SignUp from '@/views/SignUp.vue'
import LogIn from '@/views/LogIn.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import MainView from '@/views/MainView.vue'

const routes = [
  {
    path: '/',
    name: 'login-home',
    component: LogIn
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/forgotpassword',
    name: 'forgotpassword',
    component: ForgotPassword
  },
  {
    path: '/main',
    name: 'main',
    component: MainView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
