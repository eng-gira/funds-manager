<template>
  <Fund :fund="fund" />
  <router-link
    :to="{ name: 'WithdrawalFormView', query: { fund: fund } }"
    style="text-decoration: none"
  >
    <button class="button-18">Withdraw Funds</button>
  </router-link>
  <router-link
    :to="{ name: 'DepositFormView', query: { fund: fund } }"
    style="text-decoration: none"
  >
    <button class="button-18">Deposit Funds</button>
  </router-link>
</template>
<script>
import Fund from "@/components/Fund.vue";
export default {
  name: "FundView",
  components: { Fund },
  props: {
    // prop (fund) is the fund's id.
    fund: {
      type: Number,
      required: true,
    },
  },
};
</script>
