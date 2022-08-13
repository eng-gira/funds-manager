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
    GET_FUND_DETAILS(state, id) {
      /**
       * @TODO This is a temporary solution to remove.
       */
      let fund = state.funds[id - 1];
      state.fundDetails = fund;
    },
    STORE_FUND(state, fund) {
      state.funds[state.funds.length] = fund;
    },
    GET_EXISTING_FUNDS_DATA(state, fundsData) {
      state.fundsNames = fundsData.fundsNames;
      state.totalPercentages = fundsData.totalPercentages;
    },
  },
  actions: {
    async getFunds({ commit }) {
      await FundService.getFunds().then((response) => {
        console.log("Status: ", response.data);
        commit("GET_FUNDS", response.data);
      });
    },
    getFundDetails({ commit }, id) {
      /**
       * @TODO This should send a get request.
       */
      commit("GET_FUND_DETAILS", id);
    },
    getDepositsForFund({ commit }, id) {},
    getWithdrawalsForFund({ commit }, id) {},
    storeFund({ commit }, fund) {
      FundService.createFund(JSON.stringify(fund)).then((response) => {
        console.log("Status: ", response.data.message);
        commit("STORE_FUND", fund);
      });
    },
    getExistingFundsData({ commit }) {
      let funds = this.state.funds;
      let fundsNames = [];
      let totalPercentages = 0.0;
      for (let i = 0; i < funds.length; i++) {
        fundsNames.push(funds[i].name);
        console.log(funds[i]); // debug
        totalPercentages += funds[i].percentage;
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
