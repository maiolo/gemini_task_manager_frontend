import { createRouter, createWebHistory } from 'vue-router'
import Login from '/src/views/LoginView.vue'
import Signup from '/src/views/SignupView.vue'
import TaskFeed from '/src/views/TaskFeedView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/tasks',
    name: 'TaskFeed',
    component: TaskFeed
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
