// let rawData;
// let daysofWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI"];
// let scheduleData = {};

// async function fetchData() {
//   const response = await fetch("./class-routine.json");
//   rawData = await response.json();
//   // Process the fetched data
//   daysofWeek.forEach((day) => {
//     let classesForDay = [];
//     rawData.forEach((classData) => {
//       if (classData.Day === day) {
//         // Remove keys with NaN values
//         for (let key in classData) {
//           // Filters key having Value as NaN
//           if (Number.isNaN(classData[key])) {
//             delete classData[key];
//           }
//         }
//         // Adds clean data to the array
//         classesForDay.push(classData);
//       }
//     });
//     scheduleData[day] = classesForDay; // Stores the day's class data in proper format eg: {SUN: [data....], MON:[data...]}
//   });
// }
// fetchData();
// //Exporting the formatted Schedule Data to main script
// export default scheduleData;
