<template>
  <div class="mx-auto flex flex-col w-[300px] lg:w-[600px]">
    <h1 class="font-bold self-start my-3 lg:text-lg">Withdrawals</h1>
    <table class="border border-gray-500">
      <tr class="">
        <th class="p-2 uppercase font-bold text-gray-500 text-[10px]">From Fund</th>
        <th class="p-2 uppercase font-bold text-gray-500 text-[10px]">Withdrawn For</th>
        <th class="p-2 uppercase font-bold text-gray-500 text-[10px]">Date</th>
        <th class="p-2 uppercase font-bold text-gray-500 text-[10px]">Amount</th>
        <th class="p-2 uppercase font-bold text-gray-500 text-[10px]">Notes</th>
      </tr>
      <tr class="" v-for="withdrawal in withdrawals" :key="withdrawal.id">
        <td class="text-center p-2 font-bold text-[10px] lg:text-sm">{{ withdrawal.withdrawnFrom }}</td>
        <td class="text-center p-2 font-bold text-[8px] lg:text-[10px]">{{ withdrawal.withdrawalReason}}</td>
        <td class="text-center font-bold text-[7px] lg:text-[10px]">{{ formatLaravelTimeStamp(withdrawal.created_at) }}</td>
        <td class="text-center p-2 font-bold text-[10px] lg:text-sm">{{ withdrawal.withdrawnAmount }}</td>
        <td class="text-center p-2 text-[10px]">{{ withdrawal.notes  }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { formatLaravelTimeStamp } from '@/utils.js'

export default {
  name: "WithdrawalsHistoryView",
  created() {
    this.$store.dispatch("getWithdrawalsHistory"); // updates state's withdrawals.
  },
  computed: {
    withdrawals() {
      return this.$store.state.withdrawals; // all funds' withdrawals.
    },
  },
};
</script>
