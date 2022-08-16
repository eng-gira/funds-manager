<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable prettier/prettier -->
<template>
  <form @submit.prevent="submitForm">
    <h2 style="color: #04aa6d">Deposit Funds</h2>
    <br />
    <p v-if="depositSourceError" style="color:red">{{ depositSourceError }}</p>
    <label for="deposit-source"><strong>Deposit Source:</strong></label>
    <input id="deposit-source" type="text" v-model="depositSource" />
    <br />

    <p v-if="depositedToError" style="color:red">{{ depositedToError }}</p>
    <label for="deposited-to"><strong>Deposited To:</strong></label>
    <select id="deposited-to" v-model="depositedTo">
      <option disabled selected value> -- Select an Option -- </option>
      <option value="all">All (Distributed by percentage)</option>
      <option v-for="fund in funds" :key="fund.id" :value="fund.id">
        {{ fund.fundName }}
      </option>
    </select>
    <br />

    <p v-if="depositedAmountError" style="color:red">{{ depositedAmountError }}</p>
    <label for="deposited-amount"><strong>Deposited Amount:</strong></label>
    <input id="deposited-amount" type="number" v-model="depositedAmount" step="0.01" min="0.01"/>
    <br />

    <p v-if="notesError" style="color:red">{{ notesError }}</p>
    <label for="notes"><strong>Notes (Optional):</strong></label> 
    <br />
    <textarea id="notes" type="text" v-model="notes"></textarea>
    <br />
    <button class="button-18">Deposit</button>
  </form>
</template>
<script>
// eslint-disable prettier/prettier
// eslint-disable no-unused-vars

import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import FundService from "@/services/FundService.js";

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
<style scoped>
input {
  margin-bottom: 40px;
  margin-left: 30px;
  width: 300px;
  height: 35px;
}
select {
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
