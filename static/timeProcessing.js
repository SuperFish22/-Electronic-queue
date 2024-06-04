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
    if (i > 0 && i < 7) {
      return arr[i];
    }
    return 0;
}

export function getTime() {
    let current = new Date()
    let curr_time =  getDayOfTheWeek(current.getDay()) + ", " + current.getHours() + ":" + current.getMinutes();
    return curr_time;
}