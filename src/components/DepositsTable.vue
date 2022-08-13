<template>
  <table class="deposits-table">
    <tr>
      <th>Source</th>
      <th>Deposited To</th>
      <th>Date</th>
      <th>Amount</th>
      <th>Notes</th>
    </tr>
    <tr v-for="deposit in deposits" :key="deposit.id">
      <td>{{ deposit.source }}</td>
      <td>{{ deposit.destination }}</td>
      <td>{{ deposit.date }}</td>
      <td>{{ deposit.amount }}</td>
      <td>{{ deposit.notes }}</td>
    </tr>
  </table>
</template>
<script>
export default {
  name: "DepositsTable",
  props: {
    fund: {
      type: [String, Number],
      default: "all",
    },
  },
  created() {
    /**
     * @TODO Implement this.
     */
    // if (this.fund == "all") {
    //   this.$store.dispatch("getDepositsHistory"); // updates state's deposits.
    // } else {
    //   this.$store.dispatch("getDepositsForFund", this.fund); // updates state's fundDeposits.
    // }
  },
  computed: {
    deposits() {
      if (this.fund == "all") {
        return this.$store.state.deposits; // all funds' deposits.
      } else {
        return this.$store.state.fundDeposits; // specific fund deposits only.
      }
    },
  },
};
</script>
<style>
.deposits-table {
  margin: auto;
  /* border: 3px solid black; */
  border-collapse: collapse;
  width: 100%;
}
.deposits-table th {
  /* padding: 50px; */
  border: 3px solid black;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
.deposits-table td {
  padding: 100px;
  padding-left: 100px;
  padding-right: 100px;
  border: 1px solid black;
}
td,
th {
  border: 1px solid #ddd;
  padding: 50px;
}
.deposits-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.deposits-table tr:hover {
  background-color: #ddd;
}
</style>
