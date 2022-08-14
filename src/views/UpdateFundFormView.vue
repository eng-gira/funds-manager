<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/valid-template-root -->
<template>
  <form @submit.prevent="submitUpdateNameForm">
    <p v-if="fundNameError" style="color:red">{{ fundNameError }}</p>
    <label for="fund-name">Fund Name: (Currently: {{ fundDetails.fundName }})</label>
    <input type="text" id="fund-name" v-model="fundName" :placeholder="fundDetails.fundName"/>
    <button class="button-20">Update Name</button>
  </form>
  <form @submit.prevent="submitUpdatePercentageForm">
    <p v-if="fundPercentageError" style="color:red">{{ fundPercentageError }}</p>
    <label for="fund-percentage">Fund Percentage: (Currently: {{ fundDetails.fundPercentage }})</label>
    <input type="number" min="0" step="0.01" id="fund-percentage" v-model="fundPercentage" :placeholder="fundDetails.fundPercentage"/>
    <button class="button-20">Update Percentage</button>
  </form>
  <form @submit.prevent="submitUpdateSizeForm">
    <p v-if="sizeError" style="color:red">{{ sizeError }}</p>
    <label for="fund-size">Fund Size: (Currently: {{ fundDetails.size }})</label>
    <input type="number" min="0" step="0.01" id="fund-size" v-model="size" :placeholder="fundDetails.size"/>
    <button class="button-20">Update Size</button>
  </form>
  <form @submit.prevent="submitUpdateNotesForm">
    <p v-if="notesError" style="color:red">{{ notesError }}</p>
    <label for="fund-notes">Notes:</label>
    <br />
    <textarea id="fund-notes" v-model="notes" :placeholder="fundDetails.notes"></textarea>
    <br />
    Currently: <div class="current-notes"><h5>{{ fundDetails.notes }}</h5></div>
    <br />
    <button class="button-20">Update Notes</button>
  </form>      
</template>
<script>
// eslint-disable prettier/prettier
// eslint-disable no-unused-vars

import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import FundService from "@/services/FundService.js";

export default {
  name: "UpdateFundFormView",
  props: {
    fund: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    store.dispatch("getFunds").then(() => {
      store.dispatch("getFundDetails", props.fund);
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
        // Re-add this fund's current percentage-value.
        let availablePercentage =
          100 - totalPercentages + store.state.fundDetails["fundPercentage"];
        if (value > availablePercentage) {
          return (
            "The maximum value for the percentage field is " +
            availablePercentage
          );
        }
        return true;
      },
      size: (value) => {
        if (!!value == false) {
          return "The size field is required and has to be greater than 0.00";
        }
        return true;
      },
      notes: (value) => {
        if (!!value == false) {
          return "The notes field is required.";
        }
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
    fundDetails() {
      return this.$store.state.fundDetails;
    },
  },
  methods: {
    // method
    submitUpdateNameForm() {
      if (this.fundNameError) {
        console.log("Errors exist.");
        return false;
      }
      FundService.setFundName(
        JSON.stringify({ id: this.fundDetails.id, fundName: this.fundName })
      ).then(() => {
        this.$router.push("/funds");
      });
    },
    // method
    submitUpdatePercentageForm() {
      if (this.fundPercentageError) {
        console.log("Errors exist.");
        return false;
      }
      FundService.setFundPercentage(
        JSON.stringify({
          id: this.fundDetails.id,
          fundPercentage: this.fundPercentage,
        })
      ).then(() => {
        this.$router.push("/funds");
      });
    },
    // method
    submitUpdateSizeForm() {
      if (this.sizeError) {
        console.log("Errors exist.");
        return false;
      }
      FundService.setSize(
        JSON.stringify({ id: this.fundDetails.id, size: this.size })
      ).then(() => {
        this.$router.push("/funds");
      });
    },
    // method
    submitUpdateNotesForm() {
      if (this.notesError) {
        console.log("Errors exist.");
        return false;
      }
      FundService.setFundNotes(
        JSON.stringify({ id: this.fundDetails.id, notes: this.notes })
      ).then(() => {
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
.current-notes {
  width: 500px;
  height: 150px;
  background-color: rgba(196, 196, 196, 0.968);
  border: 1px solid black;
  margin: auto;
}
</style>
