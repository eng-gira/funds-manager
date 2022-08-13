/* eslint-disable no-unused-vars */
import { createStore } from "vuex";
import FundService from "@/services/FundService.js";

export default createStore({
  state: {
    funds: [],
    deposits: [],
    withdrawals: [],
    fundDeposits: [],
    fundWithdrawals: [],
    fundDetails: {},
    totalPercentages: 0,
    fundsNames: [],
  },
  getters: {},
  mutations: {
    GET_FUNDS(state, funds) {
      state.funds = funds;
    },
    GET_FUND_DETAILS(state, fund) {
      state.fundDetails = fund;
    },
    STORE_FUND(state, fund) {
      state.funds[state.funds.length] = fund;
    },
    GET_EXISTING_FUNDS_DATA(state, fundsData) {
      state.fundsNames = fundsData.fundsNames;
      state.totalPercentages = fundsData.totalPercentages;
    },
    GET_WITHDRAWALS_HISTORY(state, withdrawals) {
      state.withdrawals = withdrawals;
    },
    GET_FUND_WITHDRAWALS(state, fundWithdrawals) {
      state.fundWithdrawals = fundWithdrawals;
    },
    GET_DEPOSITS_HISTORY(state, deposits) {
      state.deposits = deposits;
    },
    GET_FUND_DEPOSITS(state, fundDeposits) {
      state.fundDeposits = fundDeposits;
    },
  },
  actions: {
    async getFunds({ commit }) {
      await FundService.getFunds().then((response) => {
        commit("GET_FUNDS", response.data);
      });
    },
    getFundDetails({ commit }, id) {
      FundService.getFund(id).then((response) => {
        commit("GET_FUND_DETAILS", response.data);
      });
    },
    getDepositsHistory({ commit }) {
      FundService.getDepositsHistory().then((response) => {
        commit("GET_DEPOSITS_HISTORY", response.data);
      });
    },
    getWithdrawalsHistory({ commit }) {
      FundService.getWithdrawalsHistory().then((response) => {
        commit("GET_WITHDRAWALS_HISTORY", response.data);
      });
    },
    getDepositsForFund({ commit }, id) {
      FundService.getDepositsHistoryForFund(id).then((response) => {
        commit("GET_FUND_DEPOSITS", response.data);
      });
    },
    getWithdrawalsForFund({ commit }, id) {
      FundService.getWithdrawalsHistoryForFund(id).then((response) => {
        commit("GET_FUND_WITHDRAWALS", response.data);
      });
    },
    storeFund({ commit }, fund) {
      FundService.createFund(JSON.stringify(fund)).then((response) => {
        commit("STORE_FUND", fund);
      });
    },
    getExistingFundsData({ commit }) {
      let funds = this.state.funds;
      let fundsNames = [];
      let totalPercentages = 0.0;
      for (let i = 0; i < funds.length; i++) {
        fundsNames.push(funds[i].name);
        // console.log(funds[i]); // debug
        totalPercentages += funds[i].fundPercentage;
      }
      // console.log(totalPercentages); // debug
      commit("GET_EXISTING_FUNDS_DATA", {
        fundsNames: fundsNames,
        totalPercentages: totalPercentages,
      });
    },
  },
  modules: {},
});
