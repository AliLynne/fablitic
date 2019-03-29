const moment = require('moment')

let days = []

for (i = 0; i < 90; i++) {
  let newDate = moment().add(i, 'days')

  days.push(newDate)
}


console.info(days)