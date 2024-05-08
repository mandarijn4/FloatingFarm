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

const sliceDate = (input) => {
   const stringedInput = JSON.stringify(input);
   const commaIndex = stringedInput.indexOf(",");
   const outputDate = new Date(stringedInput.slice(commaIndex + 2, commaIndex + 14));
   const outputTime = stringedInput.slice(commaIndex + 15, commaIndex + 17);
   outputDate.setHours(outputTime);
   return outputDate;
}

export const convertDateTime = (dateTime) => {
   return convertDate(dateTime) + " " + convertTime(dateTime);
}

export const cutDate = (item) => {
   const input = item.answers[61].prettyFormat;
   return (checkType(input, 'undefined'));
}

export const sortBookings = (bookings) => {
   const normalizedValue = [];
   const returnValue = [];
   const currentDate = new Date();
   currentDate.setDate(currentDate.getDate() - 1);
   // const lastDate = "";
   // const bookingsLength = bookings.length;
   // return bookingsLength;
   for (let index = 0; index < bookings.length; index++) {
      const element = bookings[index];
      if (typeof(element.answers[61].prettyFormat ) != 'undefined') {
         normalizedValue.push(element);
      }
   }
   for (let index = 0; index < normalizedValue.length; index++) {
      const element = normalizedValue[index];
      const stringedOutput = JSON.stringify(normalizedValue[index].answers[61].prettyFormat);
      const commaIndex = stringedOutput.indexOf(", ");
      const date = new Date(stringedOutput.slice(commaIndex + 2, commaIndex + 14));
      if (date > currentDate) {
         returnValue.push(element);
      }
   }
   returnValue.sort((a, b) => sliceDate(a.answers[61].prettyFormat)- sliceDate(b.answers[61].prettyFormat));
   return returnValue;
}