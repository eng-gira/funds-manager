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

const routes = [
  {
    path: "/funds",
    name: "FundsView",
    component: FundsView,
  },
  {
    path: "/fund",
    name: "FundView",
    component: FundView,
    props: (route) => ({ fund: parseInt(route.query.fund) }),
  },
  {
    path: "/deposits-history",
    name: "DepositsHistoryView",
    component: DepositsHistoryView,
  },
  {
    path: "/withdrawals-history",
    name: "WithdrawalsHistoryView",
    component: WithdrawalsHistoryView,
  },
  {
    path: "/withdraw",
    name: "WithdrawalFormView",
    component: WithdrawalFormView,
    props: (route) => ({ fund: parseInt(route.query.fund) }),
  },
  {
    path: "/deposit",
    name: "DepositFormView",
    component: DepositFormView,
    props: (route) => ({ fund: route.query.fund }),
  },
  {
    path: "/fund/create",
    name: "CreateFundView",
    component: CreateFundView,
  },
  {
    path: "/",
    redirect: { name: "Funds" },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFoundView",
    component: NotFoundView,
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView
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
});

export default router;
