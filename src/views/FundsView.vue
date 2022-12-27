<template>
  <div class="flex flex-col w-[350px] lg:w-[650px] mx-auto">
    <div class="flex items-center mb-3">
      <h1 class="lg:text-lg font-bold mr-3">Funds</h1>
      <router-link :to="{name: 'CreateFundView'}">
        <v-icon name="io-add-circle-outline" class="w-[20px]"/>
      </router-link>
    </div>
    <h1 class="lg:text-base text-sm mb-6 self-center">Total Balance: <strong>{{ totalBalance }}</strong></h1>

    <div class="mx-auto" v-if="funds !== null && funds.length > 0">
      <FundCard v-for="fund in funds" :key="fund.id" :fund="fund" class=""/>
    </div>
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