<template>
   <!-- Add mix -->
   <AddMixContainer />

   <!-- Last mixes -->
   <LastMixes :weeks="5"/>

   <!-- Stock -->
   <StockContainer :canEdit="true" />

   <!-- Milk Graph -->
   <GraphContainer />
</template>
  
<script>
import GraphContainer from "../cards/graphs/GraphContainer.vue";
import AddMixContainer from "../cards/mix/AddMixContainer.vue";
import StockContainer from "../cards/stock/StockContainer.vue";
import LastMixes from "../cards/overviews/LastMixes.vue";

export default {
   name: "FarmerPage",
   components: {
      AddMixContainer,
      StockContainer,
      GraphContainer,
      LastMixes
   }
};
</script>
