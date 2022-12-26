<template>
   <div class="flex flex-col p-2 w-[350px] lg:w-[600px] mx-auto">
    <div class="flex justify-between mb-3 items-center">
      <div class="flex space-x-3">
        <h1 class="font-bold lg:text-lg">
          {{ fundDetails.fundName }} Fund
        </h1>
        <router-link :to="{name: 'UpdateFundFormView', query: { fund: fundDetails.id }}"><v-icon class="w-[15px]" name="fa-pen"/></router-link>
      </div>
      <div class="flex space-x-3 lg:text-sm text-xs">
        <router-link class="hover:underline" :to="{name: 'DepositFormView', query: {fund: fundDetails.id}}">Deposit</router-link>
        <h1>|</h1>
        <router-link class="hover:underline" :to="{name: 'WithdrawalFormView', query: {fund: fundDetails.id}}">Withdraw</router-link>
      </div>
    </div>
    <!-- Fund Box -->
    <div class="flex border-2 border-blue-800 p-2 w-full justify-between rounded-lg bg-white shadow-md">
      <div class="flex flex-col">
        <h1 class="uppercase text-[8px] lg:text-[10px] text-gray-500 mb-3">Balance</h1>
        <h1 class="font-bold lg:text-lg text-xs">{{ fundDetails.balance }}</h1>
      </div>

      <div class="flex flex-col">
        <div class="flex items-center mb-3">
          <h1 class="uppercase text-[8px] lg:text-[10px] text-gray-500 mr-3">Total Deposits</h1>
          <h1 class="font-bold text-[10px] lg:text-sm">{{ fundDetails.totalDeposits }}</h1>
        </div>
        <div class="flex items-center">
          <h1 class="uppercase text-[8px] lg:text-[10px] text-gray-500 mr-3">Total Withdrawals</h1>
          <h1 class="font-bold text-[10px] lg:text-sm">{{ fundDetails.totalWithdrawals }}</h1>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="flex items-center mb-3">
          <h1 class="uppercase text-[8px] lg:text-[10px] text-gray-500 mr-3">Size</h1>
          <h1 class="font-bold text-[10px] lg:text-sm">{{ fundDetails.size }}</h1>
        </div>
        <div class="flex items-center">
          <h1 class="uppercase text-[8px] lg:text-[10px] text-gray-500 mr-3">Percentage</h1>
          <h1 class="font-bold text-[10px] lg:text-sm">{{ fundDetails.fundPercentage }} %</h1>
        </div>
      </div>
    </div> <!-- End of Fund Box -->

    <!-- Post-Fund Data -->
    <div class="flex w-full justify-between mt-3">
      <!-- Left Col -->
      <div class="flex flex-col space-y-3">
        <div class="flex items-center">
          <h1 class="uppercase lg:text-[10px] text-[8px] text-gray-500 mr-3">Created</h1>
          <h1 class="font-bold text-[8px] lg:text-sm">{{ fundDetails.createdOn }}</h1>
        </div>
        <div class="flex items-center">
          <h1 class="uppercase lg:text-[10px] text-[8px] text-gray-500 mr-3">Last Modified</h1>
          <h1 class="font-bold text-[8px] lg:text-sm">{{ fundDetails.updatedOn }}</h1>
        </div>
      </div>

      <!-- Left Col -->
      <div class="flex flex-col space-y-3">
        <div class="flex items-center">
          <h1 class="uppercase lg:text-[10px] text-[8px] text-gray-500 mr-3">Last Deposit</h1>
          <h1 class="font-bold text-[8px] lg:text-sm">{{ fundDetails.lastDeposit }}</h1>
        </div>
        <div class="flex items-center">
          <h1 class="uppercase lg:text-[10px] text-[8px] text-gray-500 mr-3">Last Withdrawal</h1>
          <h1 class="font-bold text-[8px] lg:text-sm">{{ fundDetails.lastWithdrawal }}</h1>
        </div>        
      </div>
    </div><!-- End of Post-Fund Data -->
    

    <!-- Transactions History -->
    <h1 class="font-bold self-start mt-6 lg:text-sm text-xs">Transactions History</h1>

    <h1 class="font-bold self-start my-3 lg:text-sm text-xs">Deposits</h1>
    <table class="border border-gray-500 mb-3">
      <tr class="">
        <th class="p-2 uppercase font-bold text-gray-500 lg:text-[10px] text-[8px]">Source</th>
        <th class="p-2 uppercase font-bold text-gray-500 lg:text-[10px] text-[8px]">Date</th>
        <th class="p-2 uppercase font-bold text-gray-500 lg:text-[10px] text-[8px]">Amount</th>
        <th class="p-2 uppercase font-bold text-gray-500 lg:text-[10px] text-[8px]">Notes</th>
      </tr>
      <tr class="rounded-lg" v-for="deposit in deposits" :key="deposit.id">
        <td class="p-2 font-bold text-[10px] lg:text-sm">{{ deposit.depositSource }}</td>
        <td class="p-2 font-bold text-[10px]">{{ deposit.createdOn }}</td>
        <td class="p-2 font-bold text-[10px] lg:text-sm">{{ deposit.depositedAmount }}</td>
        <td class="p-2 text-[10px]">{{ deposit.notes }}</td>
      </tr>
    </table>

    <h1 class="font-bold self-start my-3 lg:text-sm text-xs">Withdrawals</h1>
    <table class="border border-gray-500">
      <tr class="">
        <th class="p-2 uppercase font-bold text-gray-500 lg:text-[10px] text-[8px]">From Fund</th>
        <th class="p-2 uppercase font-bold text-gray-500 lg:text-[10px] text-[8px]">Withdrawn For</th>
        <th class="p-2 uppercase font-bold text-gray-500 lg:text-[10px] text-[8px]">Date</th>
        <th class="p-2 uppercase font-bold text-gray-500 lg:text-[10px] text-[8px]">Amount</th>
        <th class="p-2 uppercase font-bold text-gray-500 lg:text-[10px] text-[8px]">Notes</th>
      </tr>
      <tr class="rounded-lg" v-for="withdrawal in withdrawals" :key="withdrawal.id">
        <td class="p-2 font-bold text-[10px] lg:text-sm">{{ withdrawal.withdrawnFrom }}</td>
        <td class="p-2 font-bold text-[10px]">{{ withdrawal.withdrawalReason}}</td>
        <td class="p-2 font-bold text-[10px]">{{ withdrawal.createdOn }}</td>
        <td class="p-2 font-bold text-[10px] lg:text-sm">{{ withdrawal.withdrawnAmount }}</td>
        <td class="p-2 text-[10px]">{{ withdrawal.notes  }}</td>
      </tr>
    </table>

  </div>
</template>
<script>
export default {
  name: "FundView",
  props: {
    fund: {
      type: Number, // the fund's id.
      required: true,
    },
  },
  created() {
    this.$store.dispatch("getFundDetails", this.fund); // store the fund details in the state.
    this.$store.dispatch("getDepositsForFund", this.fund)
    this.$store.dispatch("getWithdrawalsForFund", this.fund);
  },
  computed: {
    fundDetails() {
      // dev
      console.log(this.$store.state.fundDetails)
      return this.$store.state.fundDetails
    },
    deposits() {
      return this.$store.state.fundDeposits
    },
    withdrawals() {
      return this.$store.state.fundWithdrawals
    },
  },
};
</script>
