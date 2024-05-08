<template>
   <!-- <p>Nothing to show yet.</p> -->
   <LastBookings />
   <LastMixes />
   <GraphContainer />
</template>

<script>
import LastBookings  from '../cards/overviews/LastBookings.vue';
import LastMixes from '../cards/overviews/LastMixes.vue';
import GraphContainer from '../cards/graphs/GraphContainer.vue'

   export default {
      name: 'ReinierPage',
      components: {
         LastBookings,
         LastMixes,
         GraphContainer
      }
   }
</script>