<template>
  <div v-if="fund !== null" class="bg-white hover:bg-gray-200 duration-300 mb-3 rounded-xl w-[350px] lg:w-[600px] p-3 border-gray-900 shadow-md">
      <!-- Header -->
      <div class="flex justify-between">
          <div class="flex-col">
            <div class="flex space-x-3 lg:text-md text-xs">
              <router-link :to="{name: 'Fund', query: {fund: fund.id  }}" class="font-bold">{{ fund.fundName }} Fund</router-link>
              <h1>({{ fund.fundPercentage }} %)</h1>
            </div>
          </div>
          <div class="flex flex-col">
              <div class="text-xs lg:text-sm">Balance: {{ fund.balance }}</div>
          </div>
      </div>

      <!-- Body -->
      <!-- <h1 class="flex text-xs lg:text-md">({{ fund.fundPercentage }} %)</h1> -->
      
      <!-- Footer -->
      <!-- <div class="flex justify-between mt-6 items-center">
        <h1 class="lg:text-md text-xs" v-if="fund.lastDeposit">Last Deposit: {{   fund.lastDeposit.substring(0, 10) }} </h1>
        <h1 class="lg:text-md text-xs" v-if="fund.lastWithdrawal">Last Withdrawal: {{ fund.lastWithdrawal.substring(0, 10) }} </h1>
      </div> -->
  </div>
</template>
<script setup>
import { onMounted } from 'vue';



const props = defineProps({
  fund: Object
})

onMounted(() => {
  console.log('fund', props.fund)
  console.log('fund last deposit', props.fund.lastDeposit)
})
</script>