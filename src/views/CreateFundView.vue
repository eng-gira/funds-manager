<template>
  <form @submit.prevent="submitForm" class="flex flex-col mx-auto w-[300px] lg:w-[500px] border border-gray-500 rounded-lg p-4 mb-6">
    <h1 class="font-bold lg:text-xl text-lg mb-3">Create a Fund</h1>
    <div class="flex flex-col space-y-2 mb-3">
      <label class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold" for="fund-name">Fund Name</label>
      <input
      type="text"
      class="rounded-lg p-2 ml-2 text-sm lg:text-base font-bold border border-black"
      v-model="fundName"
      id="fund-name" 
      />
      <h1 class="lg:text-xs text-[10px]" v-if="fundNameError" style="color:red">{{ fundNameError }}</h1>
    </div>

    <div class="flex flex-col space-y-2 mb-3">
      <label class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold" for="percentage">Percentage (%)</label>
      <input id="percentage" type="number" v-model="fundPercentage" step="0.01" min="0" 
      class="rounded-lg p-2 ml-2 text-sm lg:text-base font-bold border border-black"
      />
      <h1 class="lg:text-xs text-[10px]" v-if="fundPercentageError" style="color:red">{{ fundPercentageError }}</h1>
    </div>

    <div class="flex flex-col space-y-2 mb-3">
      <label class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold" for="fundSize">Size (Optional)</label>
      <input id="fundSize" type="number" v-model="size" placeholder="Default: Open" step="0.01" min="0" 
        class="rounded-lg p-2 ml-2 text-sm lg:text-base font-bold border border-black"/>
      <h1 class="lg:text-xs text-[10px]" v-if="sizeError" style="color:red">{{ sizeError }}</h1>
    </div>

    <div class="flex flex-col space-y-2 mb-3">
      <label class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold" for="notes">Notes (Optional)</label> 
      <textarea id="notes" type="text" v-model="notes"
        class="mt-5 text-xs lg:text-sm p-1 border border-gray-500 min-h-[100px] resize-none rounded-lg w-full"></textarea>
      <h1 class="lg:text-xs text-[10px]" v-if="notesError" style="color:red">{{ notesError }}</h1>
    </div>

    <button class="self-center p-2 bg-blue-900 text-white rounded-lg">Submit</button>
  </form>
</template>
<script>
// eslint-disable prettier/prettier
// eslint-disable no-unused-vars

import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";

export default {
  name: "CreateFundView",
  setup() {
    const store = useStore();
    store.dispatch("getFunds").then(() => {
      store.dispatch("getExistingFundsData");
    });

    // schema
    const validations = {
      fundName: (value) => {
        if (!!value == false) {
          return "The name field is required.";
        }
        let fundsNames = store.state.funds.map((fund) => fund.fundName);
        if (fundsNames.includes(value)) return "This name already exists.";
        return true;
      },
      fundPercentage: (value) => {
        if (!!value == false && value != 0) {
          return "The percentage field is required";
        }
        let totalPercentages = store.state.totalPercentages;
        console.log(totalPercentages, " is total %");
        let availablePercentage = 100 - totalPercentages;
        if (value > availablePercentage) {
          return (
            "The maximum value for the percentage field is 100% - (Assigned %: " +
            totalPercentages +
            ") = " +
            availablePercentage
          );
        }
        return true;
      },
      size: () => {
        return true;
      },
      notes: () => {
        return true;
      },
    };

    useForm({
      validationSchema: validations,
    });

    const { value: fundName, errorMessage: fundNameError } =
      useField("fundName");
    const { value: fundPercentage, errorMessage: fundPercentageError } =
      useField("fundPercentage");
    const { value: size, errorMessage: sizeError } = useField("size");
    const { value: notes, errorMessage: notesError } = useField("notes");

    return {
      fundName,
      fundPercentage,
      size,
      notes,
      fundNameError,
      fundPercentageError,
      sizeError,
      notesError,
    };
  },
  computed: {
    totalPercentages() {
      /**
       * @TODO return the sum of percentages
       */
      // let funds = this.$store.funds;
      return 50;
    },
  },
  methods: {
    submitForm() {
      if (
        this.sizeError ||
        this.fundPercentageError ||
        this.fundNameError ||
        this.notesError
      ) {
        console.log("Errors exist.");
        return false;
      }
      let fund = {
        fundName: this.fundName,
        fundPercentage: this.fundPercentage,
        size: this.size,
        notes: this.notes,
      };
      this.$store.dispatch("storeFund", fund);
      this.$router.push("/funds");
    },
  },
};
</script>
