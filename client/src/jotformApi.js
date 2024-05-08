import axios from "axios";

// const apiKey = '3d02a42ca6f7ebf793b9c6fb3eb84ad9';
// const formNumber = '240593413654356';

// const apiUrl1 = "https://eu-api.jotform.com/form/";
// const apiUrl2 = "/submissions?apiKey=";
// const limit = "%limit=1000"

// const completeUrl = apiUrl1 + formNumber + apiUrl2 + apiKey + limit;
const completeUrl = "https://eu-api.jotform.com/form/240593413654356/submissions?apiKey=3d02a42ca6f7ebf793b9c6fb3eb84ad9&limit=1000"

export function getBookings() {
   // const response = completeUrl;
   // console.log(response);
   return new Promise((resolve, reject) => {
      axios.get(completeUrl)
      .then((result) => {
         console.debug(result.data);
         resolve(result.data);
      }).catch((err) => {
         console.error("Not getting bookings", err);
         reject();
      });
   })
   
}
