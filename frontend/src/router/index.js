import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import SaleDetailsView from '../views/SaleDetailsView.vue'
import HistoryView from '../views/HistoryView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
  },
  {
    path: '/sales/:saleId',
    name: 'sale-details',
    component: SaleDetailsView,
    props: true,
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
