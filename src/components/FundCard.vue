<template>
  <div v-if="fund !== null" class="bg-white hover:bg-gray-200 duration-300 mb-3 rounded-xl w-[350px] lg:w-[600px] p-3 border-gray-900 shadow-md">
      <!-- Header -->
      <div class="flex justify-between">
          <div class="flex-col">
            <div class="flex space-x-3 lg:text-base text-xs">
              <router-link :to="{name: 'Fund', query: {fund: fund.id  }}" class="font-bold">{{ fund.fundName }} Fund</router-link>
              <h1>({{ fund.fundPercentage }} %)</h1>
            </div>
          </div>
          <div class="flex flex-col">
              <div class="text-xs lg:text-sm">Balance: {{ fund.balance }}</div>
          </div>
      </div>
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