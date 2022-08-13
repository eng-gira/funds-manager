<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Fund: {{ fundDetails.name }}</h1>
  <h3>Balance: {{ fundDetails.balance }}</h3>
  <h3>Created On: {{ fundDetails.createdOn }}</h3>
  <h3>Last Deposit: {{ fundDetails.lastDeposit }}</h3>
  <h3>Last Withdrawal: {{ fundDetails.lastWithdrawal }}</h3>
  <h3>
    <router-link
      :to="{ name: 'DepositsHistoryView', query: { fund: fundDetails.id } }"
      >Desposits History
    </router-link>
  </h3>
  <h3>
    <router-link
      :to="{ name: 'WithdrawalsHistoryView', query: { fund: fundDetails.id } }"
      >Withdrawals History
    </router-link>
  </h3>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Fund",
  props: {
    fund: {
      type: Number, // the fund's id.
      required: true,
    },
  },
  created() {
    /**
     * @TODO Implement this. (It doesn't do its job)
     */
    this.$store.dispatch("getFundDetails", this.fund); // store the fund details in the state.
  },
  computed: {
    fundDetails() {
      return this.$store.state.fundDetails;
    },
  },
};
</script>
