<template>
  <form  @submit.prevent="submitForm"
    class="flex flex-col mx-auto w-[300px] lg:w-[500px] max-w-[500px] border border-gray-500 rounded-lg p-4 mb-6">
    <h2 class="font-bold lg:text-xl text-lg mb-3 text-green-700">Deposit Funds</h2>

    <div class="flex flex-col space-y-2 mb-3">
      <label class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold" for="deposit-source">Deposit Source</label>
      <input
      type="text"
      class="rounded-lg p-2 text-sm lg:text-base font-bold border border-black"
      v-model="depositSource"
      id="deposit-source" 
      />
      <h1 class="lg:text-xs text-[10px]" v-if="depositSourceError" style="color:red">{{ depositSourceError }}</h1>
    </div>
    <div class="flex flex-col space-y-2 mb-3">
      <label for="deposited-to" class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold">Deposited To</label>
      <select id="deposited-to" v-model="depositedTo" class="rounded-lg p-2 text-xs lg:text-sm border border-black w-min max-w-min">
        <option disabled selected value> -- Select an Option -- </option>
        <option value="all">All (Distributed by percentage)</option>
        <option v-for="fund in funds" :key="fund.id" :value="fund.id">
          {{ fund.fundName }}
        </option>
      </select>

      <h1 class="lg:text-xs text-[10px]" v-if="depositedToError" style="color:red">{{ depositedToError }}</h1>
    </div>

    <div class="flex flex-col space-y-2 mb-3">
      <label class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold" for="deposited-amount">Deposited Amount</label>
      <input id="deposited-amount" type="number" v-model="depositedAmount" step="0.01" min="0.01" 
      class="rounded-lg p-2 text-sm lg:text-base font-bold border border-black "
      />
      <h1 class="lg:text-xs text-[10px]" v-if="depositedAmountError" style="color:red">{{ depositedAmountError }}</h1>
    </div>

    <div class="flex flex-col space-y-2 mb-3">
      <label class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold" for="notes">Notes (Optional)</label> 
      <textarea id="notes" type="text" v-model="notes"
        class="mt-5 text-xs lg:text-sm p-1 border border-gray-500 min-h-[100px] resize-none rounded-lg w-full"></textarea>
      <h1 class="lg:text-xs text-[10px]" v-if="notesError" style="color:red">{{ notesError }}</h1>
    </div>

    <button class="self-center p-2 bg-green-900 text-white rounded-lg">Deposit</button>
  </form>
</template>
<script>
import { useForm, useField } from "vee-validate"
import { useStore } from "vuex"
import FundService from "@/services/FundService.js"

export default {
  name: "DepositFormView",
  setup() {
    const store = useStore();
    store.dispatch("getFunds").then(() => {
      store.dispatch("getExistingFundsData");
    });

    // schema
    const validations = {
      depositSource: (value) => {
        if (!!value == false) {
          return "The Deposit-Source field is required.";
        }
        return true;
      },
      depositedTo: (value) => {
        if (!!value == false) {
          return "The Deposited-To field is required.";
        }
        return true;
      },
      depositedAmount: (value) => {
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

    const { value: depositSource, errorMessage: depositSourceError } =
      useField("depositSource");
    const { value: depositedTo, errorMessage: depositedToError } =
      useField("depositedTo");
    const { value: depositedAmount, errorMessage: depositedAmountError } =
      useField("depositedAmount");
    const { value: notes, errorMessage: notesError } = useField("notes");

    return {
      depositSource,
      depositedTo,
      depositedAmount,
      notes,
      depositSourceError,
      depositedToError,
      depositedAmountError,
      notesError,
    };
  },
  computed: {
    funds() {
      return this.$store.state.funds;
    },
  },
  methods: {
    submitForm() {
      if (
        this.depositedAmountError ||
        this.depositedToError ||
        this.depositSourceError ||
        this.notesError
      ) {
        console.log("Errors exist.");
        return false;
      }
      let deposit = {
        depositSource: this.depositSource,
        depositedTo: this.depositedTo,
        depositedAmount: this.depositedAmount,
        notes: this.notes,
      };
      FundService.deposit(JSON.stringify(deposit)).then(() => {
        this.$router.push("/funds");
      });
    },
  },
};
</script>