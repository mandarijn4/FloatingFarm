<template>
   <div class="container rounded border bg-light shadow p-3">
      <h4>Last 100 bookings</h4>
      <hr>

      <div class="accordion" id="accordionB">
         <div v-for="(item, index) in bookings" :key="index" class="accordion-item">
            <h2 class="accordion-header" :id="'headingB' + index">
               <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseB' + index" :aria-expanded="index === 0 ? 'true' : 'false'" :aria-controls="'collapse' + index">
                  {{ item.answers[5].prettyFormat }} • {{ item.answers[61].prettyFormat }}
               </button>
            </h2>

            <div :id="'collapseB' + index" class="accordion-collapse collapse" :aria-labelledby="'headingB' + index" data-bs-parent="#accordionB">
               <div class="accordion-body">
                  <strong>Afspraak: </strong> {{ item.answers[61].prettyFormat }} <br />
                  <strong>Naam contactpersoon: </strong> {{ item.answers[5].prettyFormat }} <br />
                  <strong>Adres: </strong> {{ item.answers[9].prettyFormat }} <br />
                  <strong>E-mailadres: </strong> {{ item.answers[7].answer }} <br />
                  <strong>Telefoonnummer: </strong> {{ item.answers[8].prettyFormat }} <br />
                  <strong>Type bezoek: </strong> {{ item.answers[19].answer }} <br />
                  <strong>Type pakket: </strong> {{ item.answers[21].answer }} <br />
                  <strong>Exact aantal personen: </strong> {{ item.answers[48].answer }} <br />
                  <strong>Proeverij: </strong> {{ item.answers[54].answer }} <br />
                  <strong>FF Goodiebag: </strong> {{ item.answers[35].answer }} <br />
                  <strong>FF Founders Fee: </strong> {{ item.answers[36].answer }} <br />
                  <strong>Lunchbox: </strong> {{ item.answers[37].answer }} <br />
                  <strong>Borrel: </strong> {{ item.answers[38].answer }} <br />
                  <strong>Diner: </strong> {{ item.answers[39].answer }} <br />
                  <strong>Mix Brownies Boterkoek: </strong> {{ item.answers[78].answer }} <br />
                  <strong>Kaasplank: </strong> {{ item.answers[77].answer }} <br />
                  <strong>Kosten basis: </strong> {{ item.answers[26].answer }} <br />
                  <strong>Kosten mogelijke extra's: </strong> {{ item.answers[27].answer }} <br />
                  <strong>Laten we kennismaken: </strong> {{ item.answers[25].answer }} <br />
                  <strong>Terms/Conditions: </strong> {{ item.answers[80].answer }} <br />
                  <strong>Afspraak datum: </strong> {{ printDate(item.answers[61].answer) }}
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { ref } from "vue";
import { getBookings } from "../../../jotformApi";

var listOfBookings = ref([]);
// var sortedListOfBookings = ref([]);

export default {
   name: 'LastBookings',
   setup() {
      getBookings().then((bookings) => {
         console.log("Bookings retrieved");
         console.log("Value of Bookings: ", bookings);
         listOfBookings.value = bookings.content;
         console.log("Value of list of Bookings: ", listOfBookings);
      });
   },
   data() {
      return {
         bookings: listOfBookings
      }
   },
   methods: {
      printDate(object) {
         var date = object["date"];
         return date;
      }
   //    sortOutput(listOfBookings) {
   //       var newest = null
   //    }
   }
}
</script>