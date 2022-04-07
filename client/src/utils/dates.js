const dateHelpers = {
    getFormattedDate: (date = null) => {
        date = date || new Date();
        var options = {day: '2-digit', month: 'short', year: 'numeric'};
        return date
            .toLocaleDateString('en-US', options)
            .replace(/,/g, "")
            .replace(/ /g, "-");
    },

    shortWeekdays: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],

    months: ["January","February","March","April","May","June","July", "August","September","October","November","December"],

    getDaysInMonth: (year, month) => {
        return new Date(year, month, 0).getDate()
    }
}

module.exports = dateHelpers