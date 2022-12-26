<template>
   <div class="flex flex-col p-2 w-[350px] lg:w-[600px] mx-auto">
    <div class="flex justify-between mb-3 items-center">
      <div class="flex space-x-3">
        <h1 v-if="!editingFundName" class="font-bold lg:text-lg">
          {{ fundDetails.fundName }} Fund
        </h1>
        <v-icon v-if="!editingFundName" class="w-[15px] cursor-pointer" name="fa-pen" @click="startEditingFundName"/>
        <input v-else type="text" @keyup.enter="updateFundName($event.target.value)" ref="fundNameUpdateField" 
          @keyup.esc="stopEditingFundName"
          @focusout="stopEditingFundName"
          class="border border-black p-1 lg:text-lg rounded-lg"
          :value="fundDetails.fundName"
        />
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
          <div class="flex space-x-2">
            <h1 title="double-click to edit" v-if="!editingFundSize" class="font-bold text-[10px] lg:text-sm" @dblclick="startEditingFundSize">{{ fundDetails.size }}</h1>
            <v-icon v-if="!editingFundSize" class="w-[8px] cursor-pointer" name="fa-pen" @click="startEditingFundSize"/>
            <input v-else @keyup.esc="stopEditingFundSize" @keyup.enter="updateFundSize($event.target.value)" 
              @focusout="stopEditingFundSize"
              ref="fundSizeUpdateField"
              class="border border-black p-1 text-xs lg:text-[10px] rounded-lg w-[40px]"
              :value="fundDetails.size"
            />
          </div>
        </div>
        <div class="flex items-center">
          <h1 class="uppercase text-[8px] lg:text-[10px] text-gray-500 mr-3">Percentage</h1>
          <div class="flex space-x-2">
            <h1 title="double-click to edit" v-if="!editingFundPercentage" @dblclick="startEditingFundPercentage" class="font-bold text-[10px] lg:text-sm">{{ fundDetails.fundPercentage }} %</h1>
            <v-icon v-if="!editingFundPercentage" class="w-[8px] cursor-pointer" name="fa-pen" @click="startEditingFundPercentage"/>
            <input v-else @keyup.esc="stopEditingFundPercentage" @keyup.enter="updateFundPercentage($event.target.value)"
              @focusout="stopEditingFundPercentage"
              ref="fundPercentageUpdateField"
              class="border border-black p-1 text-xs lg:text-[10px] rounded-lg w-[30px]"
              :value="fundDetails.fundPercentage"
            />
          </div>
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
    

    <!-- Notes Section -->
    <div class="flex flex-col items-start mt-6">
      <h1 class="uppercase lg:text-sm text-xs text-gray-500">Notes</h1>
      <textarea
        @keyup.enter="updateNotes($event.target.value)"
        @keyup.esc="$event.target.value = fundDetails.notes"
        :value="fundDetails.notes"
        ref="notesUpdateField"
        class="text-[10px] lg:text-xs p-1 border border-gray-500 min-h-[60px] resize-none rounded-lg w-full"
        />
    </div>
    <!-- End of Notes Section-->

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
        <th class="p-2 uppercase font-bold text-gray-500 lg:text-[10px] text-[8px]">Withdrawn For</th>
        <th class="p-2 uppercase font-bold text-gray-500 lg:text-[10px] text-[8px]">Date</th>
        <th class="p-2 uppercase font-bold text-gray-500 lg:text-[10px] text-[8px]">Amount</th>
        <th class="p-2 uppercase font-bold text-gray-500 lg:text-[10px] text-[8px]">Notes</th>
      </tr>
      <tr class="rounded-lg" v-for="withdrawal in withdrawals" :key="withdrawal.id">
        <td class="p-2 font-bold text-[10px]">{{ withdrawal.withdrawalReason}}</td>
        <td class="p-2 font-bold text-[10px]">{{ withdrawal.createdOn }}</td>
        <td class="p-2 font-bold text-[10px] lg:text-sm">{{ withdrawal.withdrawnAmount }}</td>
        <td class="p-2 text-[10px]">{{ withdrawal.notes  }}</td>
      </tr>
    </table>

  </div>
</template>
<script>
import { nextTick } from 'vue';
import FundService from "@/services/FundService.js"

export default {
  name: "FundView",
  props: {
    fund: {
      type: Number, // the fund's id.
      required: true,
    },
  },
  data() {
    return {
      editingFundName: false,
      editingFundPercentage: false,
      editingFundSize: false,
    }
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
  methods: {
    startEditingFundSize() {
      this.editingFundSize = true
      nextTick(() => {
        this.$refs.fundSizeUpdateField.focus()
      })
    },
    stopEditingFundSize() {
      this.editingFundSize = false
    },
    updateFundSize(value) {
      FundService.setSize(JSON.stringify({id: this.fund, size: value})).then((resp) => {
        console.log('setSize - resp', resp)
        this.$store.dispatch("getFundDetails", this.fund)
      })
      this.stopEditingFundSize()
    },

    startEditingFundName() {
      this.editingFundName = true
      nextTick(() => {
        this.$refs.fundNameUpdateField.focus()
      })
    },
    stopEditingFundName() {
      this.editingFundName = false
    },
    updateFundName(value) {
      FundService.setFundName(JSON.stringify({id: this.fund, fundName: value})).then((resp) => {
        console.log('setFundName - resp', resp)
        this.$store.dispatch("getFundDetails", this.fund)
      })
      this.stopEditingFundName()
    },

    startEditingFundPercentage() {
      this.editingFundPercentage = true
      nextTick(() => {
        this.$refs.fundPercentageUpdateField.focus()
      })
    },
    stopEditingFundPercentage() {
      this.editingFundPercentage = false
    },
    updateFundPercentage(value) {
      FundService.setFundPercentage(JSON.stringify({id: this.fund, fundPercentage: value})).then((resp) => {
        console.log('setFundPercentage - resp', resp)

        this.$store.dispatch("getFundDetails", this.fund)
      })
      this.stopEditingFundPercentage()
    },
    updateNotes(value) {
      FundService.setFundNotes(JSON.stringify({id: this.fund, notes: value})).then((resp) => {
        console.log('setFundNotes - resp', resp)
        this.$store.dispatch("getFundDetails", this.fund)
      })
      nextTick(() => {
        this.$refs.notesUpdateField.blur()
      })
    }
  }
};
</script>
