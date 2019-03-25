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

  formatISODate = (isodate) => {
    const date = new Date(Date.parse(isodate));

    var formatted = date.getDate().toString();
    formatted += " " + this.numberToMonth[date.getMonth()];
    formatted += " " + date.getFullYear();
    return formatted.includes("NaN") ? "" : formatted;
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

  getOffsetYear = (offset) => {
    var date = new Date();
    return date.getFullYear() - offset;
  }
}

export default DateUtils;