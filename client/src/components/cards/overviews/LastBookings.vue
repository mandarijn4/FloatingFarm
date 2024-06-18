<template>
   <div class="container rounded border bg-light shadow p-3 mt-5 mb-3">
      <!-- <h4 class="accordion-header" :id="headingBookingBox">
         <button class="btn btn-primary" type="button" data-toggle="collapse"
            data-target="#collapseBookingBox" :aria-expanded="sortedListOfBookings.length > 0 ? 'true' : 'false'"
            :aria-controls="collapseBookingBox">
            {{ sortedListOfBookings.length }} bookings
         </button>
      </h4> -->
      <h4>{{ bookings.length }} bookings</h4>
      <hr>
      <!-- <div :id="collapseBookingBox" class="accordion-collapse collapse" data-parent="#accordionBookingBox"> -->
         <div class="accordion" id="accordionB">
            <div v-for="(item, index) in bookings" :key="index" class="accordion-item">
               <h2 class="accordion-header" :id="'headingB' + index">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                     :data-bs-target="'#collapseB' + index" :aria-expanded="index === 0 ? 'true' : 'false'"
                     :aria-controls="'collapse' + index">
                     {{ item.answers[5].prettyFormat }} • {{ cutDate(item) }}
                  </button>
               </h2>

               <div :id="'collapseB' + index" class="accordion-collapse collapse" :aria-labelledby="'headingB' + index"
                  data-bs-parent="#accordionB">
                  <div class="accordion-body">
                     <strong>VISITOR ID:</strong> {{ item.answers[4].answer }} <br />
                     <strong>Afspraak: </strong> {{ cutDate(item) }} <br />
                     <strong>Naam contactpersoon: </strong> {{ item.answers[5].prettyFormat }} <br />
                     <strong>Adres: </strong> {{ item.answers[9].prettyFormat }} <br />
                     <strong>E-mailadres: </strong> {{ item.answers[7].answer }} <br />
                     <strong>Telefoonnummer: </strong> {{ item.answers[8].prettyFormat }} <br />
                     <strong>Type bezoek: </strong> {{ item.answers[19].answer }} <br />
                     <strong>Type pakket: </strong> {{ item.answers[21].answer }} <br />
                     <div v-if="item.answers[48].answer"><strong>Exact aantal personen: </strong> {{ item.answers[48].answer }}</div>
                     <div v-if="item.answers[54].answer"><strong>Proeverij: </strong> {{ item.answers[54].answer }}</div>
                     <div v-if="item.answers[35].answer"><strong>FF Goodiebag: </strong> {{ item.answers[35].answer }}</div>
                     <div v-if="item.answers[36].answer"><strong>FF Founders Fee: </strong> {{ item.answers[36].answer }}</div>
                     <div v-if="item.answers[37].answer"><strong>Lunchbox: </strong> {{ item.answers[37].answer }}</div>
                     <div v-if="item.answers[38].answer"><strong>Borrel: </strong> {{ item.answers[38].answer }}</div>
                     <div v-if="item.answers[39].answer"><strong>Diner: </strong> {{ item.answers[39].answer }}</div>
                     <div v-if="item.answers[78].answer"><strong>Mix Brownies Boterkoek: </strong> {{ item.answers[78].answer }}</div>
                     <div v-if="item.answers[77].answer"><strong>Kaasplank: </strong> {{ item.answers[77].answer }}</div>
                     <strong>Kosten basis: </strong> {{ item.answers[26].answer }} <br />
                     <strong>Kosten mogelijke extra's: </strong> {{ item.answers[27].answer }} <br />
                     <strong>Laten we kennismaken: </strong> {{ item.answers[25].answer }} <br />
                     <strong>Terms/Conditions: </strong> {{ item.answers[80].answer }}
                  <!-- </div> -->
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { ref } from "vue";
import { getBookings } from "@/jotformApi";
import { cutDate, sortBookings } from '@/utils/globalFunctions'

var listOfBookings = ref([]);
// var date = "";
var sortedListOfBookings = ref([]);

export default {
   name: 'LastBookings',
   setup() {
      getBookings().then((bookings) => {
         console.log("Bookings retrieved");
         console.log("Value of Bookings: ", bookings);
         listOfBookings.value = bookings.content;
         sortedListOfBookings.value = sortBookings(listOfBookings.value);
         console.log("Length of bookings: ", sortBookings(listOfBookings.value));
         console.log("Value of list of Bookings: ", listOfBookings);
      });
      // listOfBookings.value = getBookingsFunc().content;
      // console.log(listOfBookings);
   },
   data() {
      return {
         bookings: sortedListOfBookings
      }
   },
   methods: {
      cutDate
   }
}
</script>