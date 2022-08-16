<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable prettier/prettier -->
<template>
  <form @submit.prevent="submitForm">
    <h2 style="color: #d3443a">Withdraw Funds</h2>
    <br />
    <p v-if="withdrawalReasonError" style="color:red">{{ withdrawalReasonError }}</p>
    <label for="withdrawal-reason"><strong>Withdrawal Reason (Optional):</strong></label>
    <input id="withdrawal-reason" type="text" v-model="withdrawalReason" />
    <br />

    <p v-if="withdrawnFromError" style="color:red">{{ withdrawnFromError }}</p>
    <label for="withdrawn-from"><strong>From Fund:</strong></label>
    <select id="withdrawn-from" v-model="withdrawnFrom">
      <option disabled selected value> -- Fund Selection -- </option>
      <option v-for="fund in funds" :key="fund.id" :value="fund.id">
        {{ fund.fundName }}
      </option>
    </select>
    <br />

    <p v-if="withdrawnAmountError" style="color:red">{{ withdrawnAmountError }}</p>
    <label for="withdrawn-amount"><strong>Withdrawn Amount:</strong></label>
    <input id="withdrawn-amount" type="number" v-model="withdrawnAmount" step="0.01" min="0.01"/>
    <br />

    <p v-if="notesError" style="color:red">{{ notesError }}</p>
    <label for="notes"><strong>Notes (Optional):</strong></label> 
    <br />
    <textarea id="notes" type="text" v-model="notes"></textarea>
    <br />
    <button class="button-18">Withdraw</button>
  </form>
</template>
<script>
// eslint-disable prettier/prettier
// eslint-disable no-unused-vars

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
