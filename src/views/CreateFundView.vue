<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable prettier/prettier -->
<template>
  <form @submit.prevent="submitForm">
    <h2>Create a Fund</h2>
    <br />
    <p v-if="fundNameError" style="color:red">{{ fundNameError }}</p>
    <label for="fund-name"><strong>Fund Name:</strong></label>
    <input id="fund-name" type="text" v-model="fundName" />
    <br />

    <p v-if="fundPercentageError" style="color:red">{{ fundPercentageError }}</p>
    <label for="percentage"><strong>Percentage (%):</strong></label>
    <input id="percentage" type="number" v-model="fundPercentage" step="0.01" min="0.01" />
    <br />

    <p v-if="sizeError" style="color:red">{{ sizeError }}</p>
    <label for="fundSize"><strong>Size (Optional):</strong></label>
    <input id="fundSize" type="number" v-model="size" placeholder="Default: Open" step="0.01" min="0"/>
    <br />

    <p v-if="notesError" style="color:red">{{ notesError }}</p>
    <label for="notes"><strong>Notes (Optional):</strong></label> 
    <br />
    <textarea id="notes" type="text" v-model="notes"></textarea>
    <br />
    <button class="button-40">Submit</button>
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
        if (!!value == false) {
          return "The percentage field is required and has to be greater than 0.00";
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
<style scoped>
input {
  margin-bottom: 40px;
  margin-left: 30px;
  width: 300px;
  height: 35px;
}
textarea {
  margin-bottom: 40px;
  margin-top: 30px;
  width: 500px;
  height: 150px;
}
form {
  border: 1px solid black;
  padding: 20px;
  width: 800px;
  margin: auto;
}
</style>
