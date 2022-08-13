<template>
  <table class="withdrawals-table">
    <tr>
      <th>From Fund</th>
      <th>Withdrawn For</th>
      <th>Date</th>
      <th>Amount</th>
      <th>Notes</th>
    </tr>
    <tr v-for="withdrawal in withdrawals" :key="withdrawal.id">
      <td>{{ withdrawal.withdrawnFrom }}</td>
      <td>{{ withdrawal.withdrawalReason }}</td>
      <td>{{ withdrawal.createdOn }}</td>
      <td>{{ withdrawal.withdrawnAmount }}</td>
      <td>{{ withdrawal.notes }}</td>
    </tr>
  </table>
</template>
<script>
export default {
  name: "WithdrawalsTable",
  props: {
    fund: {
      type: [String, Number],
      required: true,
    },
  },
  created() {
    if (this.fund == "all") {
      this.$store.dispatch("getWithdrawalsHistory"); // updates state's withdrawals.
    } else {
      console.log("not all");
      this.$store.dispatch("getWithdrawalsForFund", this.fund); // updates state's fundWithdrawals.
    }
  },
  computed: {
    withdrawals() {
      if (this.fund == "all") {
        return this.$store.state.withdrawals; // all funds' withdrawals.
      } else {
        return this.$store.state.fundWithdrawals; // specific fund withdrawals only.
      }
    },
  },
};
</script>
<style>
.withdrawals-table {
  margin: auto;
  /* border: 3px solid black; */
  border-collapse: collapse;
  width: 100%;
}
.withdrawals-table th {
  /* padding: 50px; */
  border: 3px solid black;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #d3443a;
  color: white;
}
.withdrawals-table td {
  padding: 20px;
  padding-left: 100px;
  padding-right: 100px;
  border: 1px solid black;
}
td,
th {
  border: 1px solid #ddd;
  padding: 50px;
}
.withdrawals-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.withdrawals-table tr:hover {
  background-color: #ddd;
}
</style>
