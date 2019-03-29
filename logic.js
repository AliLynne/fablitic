const mongoose = require('mongoose')
const assert = require('assert')
mongoose.Promise = global.Promise
const moment = require('moment')

mongoose.connect('mongodb://localhost:27017/fabilitic', { useNewUrlParser: true })
const db = mongoose.connection;

const cycleSchema = mongoose.Schema({
  date: { type: Date, default: new Date() },
  periodStart: { type: Boolean },
  q1: { type: Boolean }
})

const Cycle = mongoose.model('Cycle', cycleSchema)

const addDay = day => {
  Cycle.create(day, (err) => {
    assert.equal(null, err)
    console.info(day)
    db.close()
  })
}

const getDays = () => {
  Cycle.find()
  .exec((err, list) => {
    assert.equal(null, err)
    console.info(list)
    db.close()
  })
}

const getLastWeek = () => {
  Cycle.find({
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