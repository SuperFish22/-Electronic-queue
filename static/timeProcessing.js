$(document).ready(function() {
  $(".navbar-text").text(getTime());
})

setInterval(() => {
  $(".navbar-text").text(getTime());
}, 10 * Math.pow(10, 3));

function getDayOfTheWeek(i) {
  let arr = {
    1: "ПН",
    2: "ВТ",
    3: "СР", 
    4: "ЧТ",
    5: "ПТ",
    6: "СБ",
    7: "ВС"
  }
  if (i > 0 && i < 8) { // fixed 7 to 8
    return arr[i];
  }
  return 0;
}

export function getTime() {
  let current = new Date()
  let hours = current.getHours();
  let minutes = current.getMinutes();
  let day = getDayOfTheWeek(current.getDay());
  
  hours = (hours < 10? "0" : "") + hours;
  minutes = (minutes < 10? "0" : "") + minutes;
  
  let curr_time = `${day}, ${hours}:${minutes}`;
  return curr_time;
}