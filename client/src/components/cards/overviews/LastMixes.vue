<template>
   <div class="container rounded border bg-light shadow p-3">

      <h4>Mixes of last weeks</h4>
      <hr>

      <div class="accordion" id="accordionM">
         <div v-for="(item, index) in mixes.slice().reverse()" :key="index" class="accordion-item">

            <h2 class="accordion-header" :id="'headingM' + index">
               <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  :data-bs-target="'#collapseM' + index" :aria-expanded="index === 1 ? 'true' : 'false'"
                  :aria-controls="'collapse' + index">
                  {{ convertDateTime(item.dateTime) }}
               </button>
            </h2>

            <div :id="'collapseM' + index" class="accordion-collapse collapse" :aria-labelledby="'headingM' + index"
               data-bs-parent="#accordionM"> <!-- :class="{ 'show': index === 0 }" -->
               <div class="accordion-body">
                  <strong>Notes: </strong> {{ item.notes }}
                  <!-- Loop through products -->
                  <ul>
                     <li v-for="(product, productIndex) in item.products" :key="productIndex">
                        <strong>{{ product.productName }}:</strong> {{ product.kilos }}
                     </li>
                  </ul>
               </div>
            </div>

         </div>
      </div>

   </div>
</template>

<script>
import { ref } from 'vue';
import { getMixesLastWeeks } from '@/apiConfig';
import { convertDateTime } from '@/utils/globalFunctions';

var listOfMixes = ref([]);
// var weekNumbers = weeks;

export default {
   name: 'LastMixes',
   setup() {
      // Set a default for the mixes value in return data
      getMixesLastWeeks(5).then((mixes) => {
         listOfMixes.value = mixes;
      });
      // mixes = http://https://floatingfarmfood.azurewebsites.net/server/
   },
   data() {
      return {
         mixes: listOfMixes,
         // weekNumbers: weeks
      };
   },
   props: {
      weeks: {
         type: Number,
         required: true
      }
   },
   methods: {
      convertDateTime
   }
}
</script>
