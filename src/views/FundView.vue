<template>
  <Fund :fund="fund" />
</template>
<script>
import Fund from "@/components/Fund.vue";
export default {
  name: "FundView",
  components: { Fund },
  props: {
    // prop (fund) is the fund's id.
    fund: {
      type: Number,
      required: true,
    },
  },
};
</script>
