import { createRouter, createWebHistory } from 'vue-router'
import QuestionView from './pages/QuestionView.vue'
import HomeView from './pages/HomeView.vue'

const routes = [
  { path: '/question/:id', component: QuestionView },
  { path: '/', component: HomeView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
