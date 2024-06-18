<template>
   <!-- <p>Nothing to show yet.</p> -->
   <LastBookings />
   <LastMixes />
   <GraphContainer />
   <StockContainer />
   <AddContributionContainer />
   <button @click="getSupId">SUPPLIER</button>
</template>

<script>
import { ref } from 'vue';
import LastBookings  from '../cards/overviews/LastBookings.vue';
import LastMixes from '../cards/overviews/LastMixes.vue';
import GraphContainer from '../cards/graphs/GraphContainer.vue'
import AddContributionContainer from '../cards/contribution/AddContributionContainer.vue';
import StockContainer from '../cards/stock/StockContainer.vue';
import { getSupplierID } from '@/apiConfig';

var supplierId = ref([]);

export default {
   name: 'ReinierPage',
   components: {
      LastBookings,
      LastMixes,
      GraphContainer,
      AddContributionContainer,
      StockContainer
   },
   methods: {
      getSupId() {
         getSupplierID().then((supId) => {
            console.log(supId);
            supplierId.value = supId.supplierId;
         })
      }
   }
}
</script>