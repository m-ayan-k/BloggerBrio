function convertDateFormat(inputDate) {
  // Create a Date object from the input string
  var inputDateObject = new Date(inputDate);

  // Array of month names
  var monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Get month, day, and year from the Date object
  var month = monthNames[inputDateObject.getMonth()];
  var day = inputDateObject.getDate();
  var year = inputDateObject.getFullYear();

  // Format the date as desired
  var outputDate = month + ' ' + day + ', ' + year;

  return outputDate;
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
  }
  return array;
}
export {convertDateFormat,shuffleArray};