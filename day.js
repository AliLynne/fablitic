#!/usr/bin/env node

const program = require('commander')
const { prompt } = require('inquirer')
const { addDay, getDays, getLastWeek } = require('./logic')

const questions = [
  {
    type: 'input',
    name: 'date',
    message: 'Enter the date for questions in MM/DD/YYYY format.',
    validate: function(val) {
      let pass = val.match(
        /^((((0[13578])|(1[02]))[\/]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\/]?(([0-2][0-9])|(30)))|(02[\/]?[0-2][0-9]))[\/]?\d{4}$/i
      )
      if (pass) {
        return true
      }
      return 'Please enter a valid date'
    }
  },
  {
    type: 'confirm',
    name: 'periodStart',
    message: 'Did your period start today? Leave blank for No.',
    default: false
  },
  {
    type: 'confirm',
    name: 'q1',
    message: 'Did you feel depressed, sad, down, or blue at any time today?',
    validate: function validateConfirm(res) {
      return res !== ''
    }
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
    type: 'confirm',
    name: 'q7',
    message: 'Did you feel angry or irritable today?'
  },
  {
    type: 'confirm',
    name: 'q8',
    message: 'Did you have any conflicts or problems with people today?'
  },
  {
    type: 'confirm',
    name: 'q9',
    message: 'Did you have less interest in your usual activities? (School, work, friends, hobbies)'
  },
  {
    type: 'confirm',
    name: 'q10',
    message: 'Did you have difficulty concentrating today?'
  },
  {
    type: 'confirm',
    name: 'q11',
    message: 'Did you feel tired, fatigued or have a lack of energy today?'
  },
  {
    type: 'confirm',
    name: 'q12',
    message: 'Was your appetite increased or did you overeat?'
  },
  {
    type: 'confirm',
    name: 'q13',
    message: 'Did you have cravings for any specific foods?'
  },
  {
    type: 'input',
    name: 'craving',
    message: 'Which foods did you crave?',
    when: function(answers) {
      return answers.q13 === true
    }
  },
  {
    type: 'confirm',
    name: 'q14',
    message: 'Did you sleep more, take naps, or have difficulty getting up when intended today?'
  },
  {
    type: 'confirm',
    name: 'q15',
    message: 'Did you have trouble getting to sleep or staying asleep last night?'
  },
  {
    type: 'confirm',
    name: 'q16',
    message: 'Did you feel overwhelmed or that you could not cope today?'
  },
  {
    type: 'confirm',
    name: 'q17',
    message: 'Did you feel out of control today?'
  },
  {
    type: 'confirm',
    name: 'q18',
    message: 'Were your breasts tender today?'
  },
  {
    type: 'confirm',
    name: 'q19',
    message: 'Did you have breats swelling, feel bloated, or have any weight gain today?'
  },
  {
    type: 'confirm',
    name: 'q20',
    message: 'Did you have a headache today?'
  },
  {
    type: 'confirm',
    name: 'q21',
    message: 'Did you have joint or muscle pain today?'
  },
  {
    type: 'confirm',
    name: 'q22',
    message: 'At work, school, home, or in daily routine, did at least one of the previous problems cause reduced productivity or inefficiency?'
  },
  {
    type: 'confirm',
    name: 'q23',
    message: 'Did at least one of the previous problems interfere with your hobbies or social activities? i.e. Did you avoid any of them?'
  },
  {
    type: 'confirm',
    name: 'q24',
    message: 'Did at least one of the previous problems interfere with your relationships with others?'
  },
  {
    type: 'list',
    name: 'menstrualFlow',
    message: 'What was the rate of your menstrual flow today?',
    choices: [
      'Heavy',
      'Medium',
      'Light',
      'Spotting',
      'None'
    ],
    filter: function(val) {
      return val.toLowerCase()
    }
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

program
  .command('getDays')
  .alias('g')
  .description('Get a list of all days')
  .action(days => getDays(days))

program
  .command('getLastWeek')
  .alias('w')
  .description('Get a list of the last 7 days of data')
  .action(days => getLastWeek(days))

  program.parse(process.argv)