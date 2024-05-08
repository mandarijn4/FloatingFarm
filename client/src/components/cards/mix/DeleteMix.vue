<template>
   <td>
      <button @click="deleteMix(106)" class="btn btn-primary text-dark bg-white">Delete 106</button>
   </td>
</template>

<script>
import { deleteMix } from '@/apiConfig';

export default {
   name: 'DeleteMix',
   methods: {
      deleteMix(id) {
         console.log("deleting ", id)
         deleteMix(id);
      }
   }
};
</script>