const program = require('commander')
const { prompt } = require('inquirer')
const { addDay } = require('./logic')

const questions = [
  {
    type: 'input',
    name: 'date',
    message: 'Enter the date for questions in MM/DD/YYYY format'
  },
  {
    type: 'confirm',
    name: 'periodStart',
    message: 'Did your period start today?'
  },
  {
    type: 'confirm',
    name: 'q1',
    message: 'Did you feel depressed, sad, down, or blue at any time today?'
  },
  {
    type: 'confirm',
    name: 'q2',
    message: 'Did you feel hopeless at any time today?'
  },
  {
    type: 'confirm',
    name: 'q3',
    message: 'Did you feel worthless or guilty at any time today?'
  },
  {
    type: 'confirm',
    name: 'q4',
    message: 'Did you feel anxious, tense, keyed up, or on edge at any time today?'
  },
  {
    type: 'confirm',
    name: 'q5',
    message: 'Did you have any mood swings today (e.g., suddenly felt sad or tearful)?'
  },
  {
    type: 'confirm',
    name: 'q6',
    message: 'Were you more sensitive to rejection or were your feelings more easily hurt today?'
  },
  {
    
  }
]

program
  .version('0.0.1', '-v, --version')
  .description('PMS/PMDD Symptom Tracker')

program
  .command('addDay')
  .alias('a')
  .description('Add a new day')
  .action(() => {
    prompt(questions).then(answers => addDay(answers))
  })

  program.parse(process.argv)