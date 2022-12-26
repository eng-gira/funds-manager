<template>
  <div>
    <h4 style="display: inline-block; margin-left: 10px">
      <router-link
        style="text-decoration: none"
        :to="{ name: 'DepositsHistoryView'}"
        >Deposits History
      </router-link>
    </h4>
    <h4 style="display: inline-block; margin-left: 10px">
      <router-link
        :to="{ name: 'WithdrawalsHistoryView'}"
        style="text-decoration: none"
        >Withdrawals History
      </router-link>
    </h4>
    <h4 style="display: inline-block; margin-left: 10px">
      <router-link to="/fund/create" style="text-decoration: none">
        Create a Fund
      </router-link>
    </h4>
    <h4 style="display: inline-block; margin-left: 10px">
      <router-link to="/deposit" style="text-decoration: none">
        Deposit Funds
      </router-link>
    </h4>
  </div>
  <h3>Total Balance: {{ totalBalance }}</h3>
  <br />

  <div v-if="funds !== null && funds.length > 0">
    <FundCard v-for="fund in funds" :key="fund.id" :fund="fund" class="flex flex-col mx-auto"/>
  </div>
</template>

<script>
import FundCard from '../components/FundCard.vue'


export default {
  name: "FundsView",
  created() {
    this.$store.dispatch("getFunds");
  },
  data() {
    return {};
  },
  computed: {
    funds() {
      return this.$store.state.funds;
    },
    totalBalance() {
      if(!this.funds) return 0
      
      let funds = this.funds;
      let total = 0;
      for (let i = 0; i < funds.length; i++) {
        total += funds[i].balance;
      }
      return total;
    },
  },
  components: {
    FundCard,
  }
};
</script>