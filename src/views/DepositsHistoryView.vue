<template>
  <div class="mx-auto flex flex-col w-[300px] lg:w-[600px]">
    <h1 class="font-bold self-start my-3 lg:text-lg">Deposits</h1>
    <table class="border border-gray-500 mb-3">
      <tr class="">
        <th class="p-2 uppercase font-bold text-gray-500 text-[10px]">Source</th>
        <th class="p-2 uppercase font-bold text-gray-500 text-[10px]">Deposited To</th>
        <th class="p-2 uppercase font-bold text-gray-500 text-[10px]">Date</th>
        <th class="p-2 uppercase font-bold text-gray-500 text-[10px]">Amount</th>
        <th class="p-2 uppercase font-bold text-gray-500 text-[10px]">Notes</th>
      </tr>
      <tr class="" v-for="deposit in deposits" :key="deposit.id">
        <td class="p-2 text-center font-bold text-[10px] lg:text-sm">{{ deposit.depositSource }}</td>
        <td class="p-2 text-center font-bold text-[10px] lg:text-sm">{{ deposit.depositedTo }}</td>
        <td class="text-center font-bold text-[7px] lg:text-[10px]">{{ deposit.createdOn }}</td>
        <td class="p-2 text-center font-bold text-[10px] lg:text-sm">{{ deposit.depositedAmount }}</td>
        <td class="p-2 text-center text-[10px]">{{ deposit.notes }}</td>
      </tr>
    </table>
  </div>
</template>
<script>

export default {
name: "DepositsTable",
created() {
  this.$store.dispatch("getDepositsHistory"); // updates state's deposits.
},
computed: {
  deposits() {
    return this.$store.state.deposits; // all funds' deposits.
  },
},
};
</script>