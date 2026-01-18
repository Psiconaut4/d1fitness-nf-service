import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import SaleDetailsView from '../views/SaleDetailsView.vue'

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
  }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
