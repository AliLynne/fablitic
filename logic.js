const mongoose = require('mongoose')
const assert = require('assert')
const moment = require('moment')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/fabilitic', { useNewUrlParser: true })
const db = mongoose.connection;

const daySchema = mongoose.Schema({
  date: { type: Date, default: new Date() },
  periodStart: { type: Boolean },
  q1: { type: Boolean },
  q2: { type: Boolean },
  q3: { type: Boolean }
})

const Day = mongoose.model('Day', daySchema)

const addDay = day => {
  Day.create(day, (err) => {
    assert.equal(null, err)
    console.info(day)
    db.close()
  })
}

const getDays = () => {
  Day.find()
  .exec((err, list) => {
    assert.equal(null, err)
    console.info(list)
    db.close()
  })
}

const getLastWeek = () => {
  Day.find({
    date: {
      $gte: moment().subtract(7, 'days').calendar()
    }
  })
  .exec((err, list) => {
    assert.equal(null, err)
    console.info(list)
    db.close()
  })
}

module.exports = { addDay, getDays, getLastWeek }