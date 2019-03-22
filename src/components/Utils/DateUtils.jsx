class DateUtils {
  constructor() {
    this.numberToMonth = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    this.numberToWeekday = [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Firday", "Saturday", "Sunday",
    ];
    this.numberToDaysInMonth = [
      31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ]
  }

  getOffsetDate = (offset) => {
    var date = new Date();
    date.setDate(date.getDate() - offset);

    var datestr = this.numberToWeekday[date.getDay()];
    datestr += " " + date.getDate();
    datestr += " " + this.numberToMonth[date.getMonth()];
    datestr += " " + date.getFullYear();
    return datestr;
  }
}

export default DateUtils;