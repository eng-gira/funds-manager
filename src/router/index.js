import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FundsView from "@/views/FundsView.vue";
import FundView from "@/views/FundView.vue";
import DepositsHistoryView from "@/views/DepositsHistoryView.vue";
import WithdrawalsHistoryView from "@/views/WithdrawalsHistoryView.vue";
import WithdrawalFormView from "@/views/WithdrawalFormView.vue";
import DepositFormView from "@/views/DepositFormView.vue";
import CreateFundView from "@/views/CreateFundView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
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
  {
    path: "/funds",
    name: "Funds",
    component: FundsView,
  },
  {
    path: "/fund",
    name: "Fund",
    component: FundView,
    props: (route) => ({ fund: parseInt(route.query.fund) }),
  },
  {
    path: "/deposits-history",
    name: "DepositsHistoryView",
    component: DepositsHistoryView,
    props: (route) => ({ fund: parseInt(route.query.fund) }),
  },
  {
    path: "/withdrawals-history",
    name: "WithdrawalsHistoryView",
    component: WithdrawalsHistoryView,
    props: (route) => ({ fund: parseInt(route.query.fund) }),
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
    props: (route) => ({ fund: parseInt(route.query.fund) }),
  },
  {
    path: "/fund/create",
    name: "CreateFundView",
    component: CreateFundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
