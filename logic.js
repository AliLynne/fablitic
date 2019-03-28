const mongoose = require('mongoose')
const assert = require('assert')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/fabilitic', { useNewUrlParser: true })
const db = mongoose.connection;

const cycleSchema = mongoose.Schema({
  date: { type: Date },
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

module.exports = { addDay }