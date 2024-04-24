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

export const convertDateTime = (dateTime) => {
   return convertDate(dateTime) + " " + convertTime(dateTime);
}

export const cutDate = (item) => {
   const output = item.answers[61].prettyFormat;
   const stringed = JSON.stringify(output);
   if (typeof output == 'undefined') {
      return "";
   } else {
      var index = stringed.indexOf(",");
      const cutted = stringed.slice(index + 2, index + 14);
      const dated = new Date(cutted);
      var dagNumber = new Date(dated).getDay();
      const time = stringed.slice(index + 15, index + 17);
      // const newBeginTime = (parseInt(time) + 6);
      // const newEndTime = (parseInt(time) + 8);
      // const longBeginTime = (newBeginTime > 9 ? '' : 0).toString() + newBeginTime.toString() + ":00";
      // const longEndTime = (newEndTime > 9 ? '' : 0).toString() + newEndTime.toString() + ":00";
      return (dagen[dagNumber] + " " + convertDate(dated) + ", " + durationTime(time));
   }
}