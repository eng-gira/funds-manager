<template>
  <h3>
    Showing the withdrawals history for
    {{
      !!fundDetails ? "the " + fundDetails.fundName + " Fund." : "all funds."
    }}
  </h3>
  <WithdrawalsTable :fund="fund" />
</template>
<script>
import WithdrawalsTable from "@/components/WithdrawalsTable";

export default {
  name: "WithdrawalsHistoryView",
  components: { WithdrawalsTable },
  props: {
    fund: {
      type: [String, Number],
      required: true,
    },
  },
  created() {
    if (this.fund != "all") {
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
