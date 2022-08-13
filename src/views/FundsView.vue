<template>
  <h1>The Funds</h1>
  <div>
    <h4 style="display: inline-block; margin-left: 10px">
      <router-link
        style="text-decoration: none"
        :to="{ name: 'DepositsHistoryView', query: { fund: 'all' } }"
        >Deposits History
      </router-link>
    </h4>
    <h4 style="display: inline-block; margin-left: 10px">
      <router-link
        :to="{ name: 'WithdrawalsHistoryView', query: { fund: 'all' } }"
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
    <h4 style="display: inline-block; margin-left: 10px">
      <router-link to="/withdraw" style="text-decoration: none">
        Withdraw Funds
      </router-link>
    </h4>
  </div>
  <h3>Total Balance: {{ totalBalance }}</h3>
  <br />
  <table class="funds-table">
    <tr>
      <th>FUND</th>
      <th>BALANCE</th>
      <th>LAST DEPOSIT</th>
      <th>LAST WITHDRAWAL</th>
    </tr>
    <tr v-for="fund in funds" :key="fund.id">
      <td>
        <router-link
          :to="{ name: 'Fund', query: { fund: fund.id } }"
          style="text-decoration: none"
        >
          <strong>{{
            fund.fundName + " (" + fund.fundPercentage + " %)"
          }}</strong>
        </router-link>
      </td>
      <td>{{ fund.balance }}</td>
      <td>{{ fund.lastDeposit }}</td>
      <td>{{ fund.lastWithdrawal }}</td>
    </tr>
  </table>
</template>

<script>
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
      let funds = this.funds;
      let total = 0;
      for (let i = 0; i < funds.length; i++) {
        total += funds[i].balance;
      }
      return total;
    },
  },
};
</script>
<style scoped>
.funds-table {
  margin: auto;
  /* border: 3px solid black; */
  border-collapse: collapse;
  width: 100%;
}
th {
  /* padding: 50px; */
  border: 3px solid black;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: black;
  color: white;
  text-align: center;
}
td {
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
.funds-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.funds-table tr:hover {
  background-color: #ddd;
}
</style>
