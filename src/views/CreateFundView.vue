<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable prettier/prettier -->
<template>
  <form @submit.prevent="submitForm">
    <h2>Create a Fund</h2>
    <br />
    <p v-if="nameError" style="color:red">{{ nameError }}</p>
    <label for="fund-name"><strong>Fund Name:</strong></label>
    <input id="fund-name" type="text" v-model="name" />
    <br />

    <p v-if="percentageError" style="color:red">{{ percentageError }}</p>
    <label for="percentage"><strong>Percentage (%):</strong></label>
    <input id="percentage" type="number" v-model="percentage" step="0.01" min="0.01" />
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
      name: (value) => {
        if (!!value == false) {
          return "The name field is required.";
        }
        return true;
      },
      percentage: (value) => {
        if (!!value == false) {
          return "The percentage field is required.";
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

    const { value: name, errorMessage: nameError } = useField("name");
    const { value: percentage, errorMessage: percentageError } =
      useField("percentage");
    const { value: size, errorMessage: sizeError } = useField("size");
    const { value: notes, errorMessage: notesError } = useField("notes");

    return {
      name,
      percentage,
      size,
      notes,
      nameError,
      percentageError,
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
        this.percentageError ||
        this.nameError ||
        this.notesError
      ) {
        console.log("Errors exist.");
        return false;
      }
      let fund = {
        name: this.name,
        percentage: this.percentage,
        size: this.size,
        notes: this.notes,
      };
      this.$store.dispatch("storeFund", fund);
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
