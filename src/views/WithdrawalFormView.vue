<template>
  <form  @submit.prevent="submitForm"
    class="flex flex-col mx-auto w-[300px] lg:w-[500px] max-w-[500px] border border-gray-500 rounded-lg p-4 mb-6">
    <h2 class="font-bold lg:text-xl text-lg mb-3 text-red-700">Withdraw Funds</h2>

    <div class="flex flex-col space-y-2 mb-3">
      <label class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold" for="withdrawal-reason">Withdrawal Reason (Optional)</label>
      <input
      type="text"
      class="rounded-lg p-2 text-sm lg:text-base font-bold border border-black"
      v-model="withdrawalReason"
      id="withdrawal-reason" 
      />
      <h1 class="lg:text-xs text-[10px] text-red-500" v-if="withdrawalReasonError">{{ withdrawalReasonError }}</h1>
    </div>

    <div class="flex flex-col space-y-2 mb-3">
      <label for="withdrawn-from" class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold">From Fund</label>
      <select id="withdrawn-from" v-model="withdrawnFrom" class="rounded-lg p-2 text-xs lg:text-sm border border-black w-min max-w-min">
        <option disabled selected value> -- Fund Selection -- </option>
        <option v-for="fund in funds" :key="fund.id" :value="fund.id">
          {{ fund.fundName }}
        </option>
      </select>

      <h1 class="lg:text-xs text-[10px] text-red-500" v-if="withdrawnFromError">{{ withdrawnFromError }}</h1>
    </div>

    <div class="flex flex-col space-y-2 mb-3">
      <label class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold" for="withdrawn-amount">Withdrawn Amount</label>
      <input id="withdrawn-amount" type="number" v-model="withdrawnAmount" step="0.01" min="0.01" 
        class="rounded-lg p-2 text-sm lg:text-base font-bold border border-black "
      />
      <h1 class="lg:text-xs text-[10px] text-red-500" v-if="withdrawnAmountError">{{ withdrawnAmountError }}</h1>
    </div>

    <div class="flex flex-col space-y-2 mb-3">
      <label class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold" for="notes">Notes (Optional)</label> 
      <textarea id="notes" type="text" v-model="notes"
        class="mt-5 text-xs lg:text-sm p-1 border border-gray-500 min-h-[100px] resize-none rounded-lg w-full"></textarea>
      <h1 class="lg:text-xs text-[10px] text-red-500" v-if="notesError">{{ notesError }}</h1>
    </div>

    <button class="self-center p-2 bg-red-900 text-white rounded-lg">Withdraw</button>
  </form>
</template>
<script>
import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import FundService from "@/services/FundService.js";

export default {
  name: "WithdrawalFormView",
  setup() {
    const store = useStore();
    store.dispatch("getFunds").then(() => {
      store.dispatch("getExistingFundsData");
    });

    // schema
    const validations = {
      withdrawalReason: () => {
        return true;
      },
      withdrawnFrom: (value) => {
        if (!!value == false) {
          return "The Withdrawn-From field is required.";
        }
        return true;
      },
      withdrawnAmount: (value) => {
        if (!!value == false || value <= 0) {
          return false;
        }
        return true;
      },
      notes: () => {
        return true;
      },
    };

    useForm({
      validationSchema: validations,
    });

    const { value: withdrawalReason, errorMessage: withdrawalReasonError } =
      useField("withdrawalReason");
    const { value: withdrawnFrom, errorMessage: withdrawnFromError } =
      useField("withdrawnFrom");
    const { value: withdrawnAmount, errorMessage: withdrawnAmountError } =
      useField("withdrawnAmount");
    const { value: notes, errorMessage: notesError } = useField("notes");

    return {
      withdrawalReason,
      withdrawnFrom,
      withdrawnAmount,
      notes,
      withdrawalReasonError,
      withdrawnFromError,
      withdrawnAmountError,
      notesError,
    };
  },
  props: {
    fund: {
      type: Number,
    },
  },
  computed: {
    funds() {
      return this.$store.state.funds;
    },
  },
  methods: {
    submitForm() {
      if (
        this.withdrawnAmountError ||
        this.withdrawnFromError ||
        this.withdrawalReasonError ||
        this.notesError
      ) {
        console.log("Errors exist.");
        return false;
      }
      let withdrawal = {
        withdrawalReason: this.withdrawalReason,
        withdrawnFrom: this.withdrawnFrom,
        withdrawnAmount: this.withdrawnAmount,
        notes: this.notes,
      };
      FundService.withdraw(JSON.stringify(withdrawal)).then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>
