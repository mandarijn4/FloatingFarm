<template>
   <!-- Users -->
   <!-- <UsersContainer /> -->

   <div class="container mt-5 mb-3" style="padding-left: 0px; padding-right: 0px;">
      <div class="row g-0">
         <div class="col" style="padding-right: 1rem;">
            <!-- Last contributions -->
            <!-- <LastContributions /> -->
            <AddMixContainer />
         </div>

         <div class="col" style="padding-left: 1rem;">
            <!-- Last mixes -->
            <LastMixes :weeks="2"/>
            <!-- <DeleteMix /> -->
         </div>
      </div>
   </div>

   <!-- Stock -->
   <StockContainer :canEdit="true" />

   <!-- Milk graph -->
   <!-- <GraphContainer /> -->

   <!-- Upcomming Bookings -->
   <LastBookings />

   <!-- <button @click="getSupId">SUPPLIER</button> -->
</template>

<script>
// import { ref } from 'vue'
// import UsersContainer from '../cards/users/UsersContainer.vue';
// import LastContributions from '../cards/overviews/LastContributions.vue';
import LastMixes from '../cards/overviews/LastMixes.vue';
// import DeleteMix from '../cards/mix/DeleteMix.vue';
import StockContainer from '../cards/stock/StockContainer.vue';
// import GraphContainer from '../cards/graphs/GraphContainer.vue';
import LastBookings from '../cards/overviews/LastBookings.vue';
import AddMixContainer from '../cards/mix/AddMixContainer.vue'
// import { getSupplierID } from '@/apiConfig';

// const supplierId = ref([]);

export default {
   name: 'AdminPage',
   components: {
      // UsersContainer,
      // LastContributions,
      LastMixes,
      StockContainer,
      // GraphContainer,
      // DeleteMix,
      LastBookings,
      AddMixContainer
   // },
   // methods: {
   //    getSupId() {
   //       getSupplierID().then((supId) => {
   //          console.log(supId);
   //          supplierId.value = supId;
   //       })
   //    }
   }
}
</script>
