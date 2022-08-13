/* eslint-disable */
<template>
  <h3>
    Showing the deposits history for
    {{
      !!fundDetails ? "the " + fundDetails.fundName + " Fund." : "all funds."
    }}
  </h3>
  <DepositsTable :fund="fund" />
</template>
<script>
import DepositsTable from "@/components/DepositsTable.vue";

export default {
  name: "DeposistsHistoryView",
  components: { DepositsTable },
  props: {
    fund: {
      type: [String, Number],
      required: true,
    },
  },
  created() {
    if (this.fund != "all") {
      console.log("not all from dep. hist. view.");
      this.$store.dispatch("getFundDetails", this.fund);
    }
  },
  computed: {
    fundDetails() {
      return this.fund == "all" ? null : this.$store.state.fundDetails;
    },
  },
};
</script>
