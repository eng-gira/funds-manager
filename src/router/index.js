import { createRouter, createWebHistory } from "vue-router"
import FundsView from "@/views/FundsView.vue"
import FundView from "@/views/FundView.vue"
import DepositsHistoryView from "@/views/DepositsHistoryView.vue"
import WithdrawalsHistoryView from "@/views/WithdrawalsHistoryView.vue"
import WithdrawalFormView from "@/views/WithdrawalFormView.vue"
import DepositFormView from "@/views/DepositFormView.vue"
import CreateFundView from "@/views/CreateFundView.vue"
import NotFoundView from "@/views/NotFoundView.vue"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import AppLayout from '@/views/layouts/AppLayout.vue'
import AuthLayout from '@/views/layouts/AuthLayout.vue'
import { publicPath } from '../vue.config'

const routes = [
  {
    path: '/auth',
    name: 'AuthLayout',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'LoginView',
        component: LoginView
      },
      {
        path: 'register',
        name: 'RegisterView',
        component: RegisterView
      },
    ]
  },
  {
    path: "/",
    name: 'AppLayout',
    component: AppLayout,
    children: [
      {
        path: "",
        name: "FundsView",
        component: FundsView,
        meta: { requiresAuth: true }
      },
      {
        path: "funds",
        redirect: { name: 'FundsView' }
      },
      {
        path: "fund",
        name: "FundView",
        component: FundView,
        meta: { requiresAuth: true },
        props: (route) => ({ fund: parseInt(route.query.fund) }),
      },
      {
        path: "deposits-history",
        name: "DepositsHistoryView",
        component: DepositsHistoryView,
        meta: { requiresAuth: true },
      },
      {
        path: "withdrawals-history",
        name: "WithdrawalsHistoryView",
        component: WithdrawalsHistoryView,
        meta: { requiresAuth: true },
      },
      {
        path: "withdraw",
        name: "WithdrawalFormView",
        component: WithdrawalFormView,
        meta: { requiresAuth: true },
        props: (route) => ({ fund: parseInt(route.query.fund) }),
      },
      {
        path: "deposit",
        name: "DepositFormView",
        component: DepositFormView,
        meta: { requiresAuth: true },
        props: (route) => ({ fund: route.query.fund }),
      },
      {
        path: "fund/create",
        name: "CreateFundView",
        component: CreateFundView,
        meta: { requiresAuth: true },
      },

    ]
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFoundView",
    component: NotFoundView,
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
  base: publicPath
})

router.beforeEach((to, from) => {
  if(to.meta && to.meta.requiresAuth == true) {
    if(!localStorage.getItem('access_token')) {
      router.push('/auth/login')
    }
  }
})

export default router;
