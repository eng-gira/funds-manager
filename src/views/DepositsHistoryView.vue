<template>
  <h3>
    Showing the deposits history for
    {{ !!fundDetails ? "the " + fundDetails.name + " Fund." : "all funds." }}
  </h3>
  <DepositsTable />
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
