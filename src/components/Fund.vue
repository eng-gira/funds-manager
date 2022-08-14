<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <h1>Fund: {{ fundDetails.fundName }}</h1>
    <h5>
      <router-link
        :to="{ name: 'UpdateFundFormView', query: { fund: fundDetails.id } }"
        >Edit</router-link
      >
    </h5>
    <h3>Percentage: {{ fundDetails.fundPercentage }} %</h3>
    <h3>Balance: {{ fundDetails.balance }}</h3>
    <h3>Created On: {{ fundDetails.createdOn }}</h3>
    <h3>Last Deposit: {{ fundDetails.lastDeposit }}</h3>
    <h3>Last Withdrawal: {{ fundDetails.lastWithdrawal }}</h3>
    <h4>Notes: {{ fundDetails.notes }}</h4>
    <br />
    <div class="options">
      <h3>
        <router-link
          :to="{ name: 'DepositsHistoryView', query: { fund: fundDetails.id } }"
          >Desposits History
        </router-link>
      </h3>
      <h3>
        <router-link
          :to="{
            name: 'WithdrawalsHistoryView',
            query: { fund: fundDetails.id },
          }"
          >Withdrawals History
        </router-link>
      </h3>
      <h3>
        <router-link
          :to="{ name: 'WithdrawalFormView', query: { fund: fundDetails.id } }"
          style="text-decoration: none"
        >
          <button class="button-18">Withdraw Funds</button>
        </router-link>
        <router-link
          :to="{ name: 'DepositFormView', query: { fund: fundDetails.id } }"
          style="text-decoration: none; margin-left: 150px"
        >
          <button class="button-18">Deposit Funds</button>
        </router-link>
      </h3>
    </div>
  </div>
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
<style scoped>
.container {
  text-align: left;
  border: 1px solid black;
  width: 500px;
  margin: auto;
  padding: 20px;
}
.container h1 {
  text-align: center;
  margin-bottom: 30px;
}
.container h5 {
  text-align: center;
}
.options {
  text-align: center;
}
</style>
