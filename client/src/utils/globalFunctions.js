const dagen = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];

const convertDate = (dateTime) => {
   const dateObject = new Date(dateTime);
   const date = (dateObject.getDate() > 9 ? '' : 0).toString() + (dateObject.getDate()).toString() 
      + "–" + ((dateObject.getMonth() + 1) > 9 ? '' : 0) + (dateObject.getMonth() + 1)
      + "–" + dateObject.getFullYear();
      return date;
}

const convertTime = (dateTime) => {
   const date = new Date(dateTime);
   const time = ((date.getHours() - 1 ) > 9 ? '' : 0).toString() + (date.getHours() - 1).toString()
       + ":" + (date.getMinutes() > 9 ? '' : 0) + date.getMinutes();
   return time
}

const durationTime = (time) => {
   const beginTime = parseInt(time) + 6;
   const interval = (beginTime > 9 ? '' : 0).toString() + beginTime.toString() + ":00" + " – " + ((beginTime + 2) > 9 ? '' : 0) + (beginTime + 2) + ":00";
   return interval;
}

const checkType = (output, type) => {
   if (typeof output == type) {
      return "";
   } else {
      return convertToEUFormat(output);
   }
}

const convertToEUFormat = (output) => {
   const stringedOutput = JSON.stringify(output);
   const index = stringedOutput.indexOf(",");
   const cuttedOutput = stringedOutput.slice(index + 2, index + 14);
   const dateEUFormat = new Date(cuttedOutput);
   const dayNumber = dateEUFormat.getDay();
   const time = stringedOutput.slice(index + 15, index + 17);
   return (dagen[dayNumber] + " " + convertDate(dateEUFormat) + ", " + durationTime(time));
}

export const convertDateTime = (dateTime) => {
   return convertDate(dateTime) + " " + convertTime(dateTime);
}

export const cutDate = (item) => {
   const input = item.answers[61].prettyFormat;
   return (checkType(input, 'undefined'));
}

// export const sortBookings = (bookings) => {

// }