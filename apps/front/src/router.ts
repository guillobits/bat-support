import { createRouter, createWebHistory } from 'vue-router'
import QuestionView from './pages/QuestionView.vue'
import HomeView from './pages/HomeView.vue'
import SummaryView from './pages/SummaryView.vue'

const routes = [
  { name: 'home', path: '/', component: HomeView },
  { name: 'question', path: '/questions/:id', component: QuestionView },
  { name: 'support-ticket', path: '/support-ticket/new', component: SummaryView},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
