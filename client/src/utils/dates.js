const dateHelpers = {
  getFormattedDate: (date = null) => {
    date = date || new Date()
    var options = { day: "2-digit", month: "short", year: "numeric" }
    return date.toLocaleDateString("en-US", options).replace(/,/g, "").replace(/ /g, "-")
  },

  shortWeekdays: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],

  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

  getDaysInMonth: (year, month) => {
    return new Date(year, month, 0).getDate()
  },

  getWeekday: date => {
    var dayOptions = { weekday: "long" }
    return dateHelpers.getLocaleDate(date, dayOptions)
  },

  getPrintedDate: date => {
    var dateOptions = { month: "long", day: "numeric", year: "numeric" }
    return dateHelpers.getLocaleDate(date, dateOptions)
  },

  getLocaleDate: (date, options, locale = "en-US") => new Date(date).toLocaleDateString(locale, options),

  getFirstDay: (year, month) => new Date(year, month, 1).getDay() + 1,
}

module.exports = dateHelpers
