const util = require('util')
const convert = require('./convert.js')

function display (val) {
  console.log(util.inspect(val, false, null, true))
}

var input = [
  // {name: 'kk2', parents: ['sister', 'spouse'], level: 0},
  // {name: 'kk3', parents: ['sister2', 'spouse2'], level: 0},
  {name: 'marie',  parents: ['marie1', 'marie2'], level: 1},
  {name: 'sister',  parents: ['marie1', 'marie2'], level: 1},
  {name: 'spouse', parents: ['marie1', 'marie2'], step: true, level: 1},
  {name: 'sister2',  parents: ['marie1', 'marie2'], level: 1},
  {name: 'spouse2',  parents: ['marie1', 'marie2'], step: true, level: 1},
  {name: 'marie1',  parents: [], level: 2},
  {name: 'marie2',  parents: [], level: 2}
]

// var input = [
//   {name: 'miniandrew', parents: ['andrew', 'girlfriend'], level: -1},
//   {name: 'girlfriend', parents: [], level: 0},
//   {name: 'brad', parents: ['jim', 'liz'], level: 0},
//   {name: 'andrew', parents: ['richard', 'marie'], level: 0},
//   {name: 'kk', parents: ['richard', 'marie'], level: 0},
//   {name: 'richard', parents: ['leonard', 'catherine'], level: 1},
//   {name: 'liz',  parents: ['barton', 'jean'], level: 1},
//   {name: 'marie', parents: ['barton', 'jean'], level: 1},
//   {name: 'jim',  parents: [], level: 1},
//   {name: 'leonard', parents: ['dora', 'lukas'], level: 2},
//   {name: 'catherine', parents: [], level: 2},
//   {name: 'barton', parents: ['marie swift', 'laurence'], level: 2},
//   // {name: 'beatrice', parents: ['marie swift', 'laurence'], level: 2},
//   // {name: 'mary lynn', parents: ['marie swift', 'laurence'], level: 2},
//   {name: 'margurite', parents: ['marie swift', 'laurence'], level: 2},
//   // {name: 'paul', parents: [], level: 2},
//   {name: 'jean', parents: [], level: 2},
//   {name: 'dora', parents: [], level: 3},
//   {name: 'lukas', parents: [], level: 3},
//   {name: 'marie swift', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'george a', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'cecil', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'edwin', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'samuel george II', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'robert mitchell', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'beatrice alice', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'margurite ellen', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'babe', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'lilian frances', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'anona', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'alma dean', parents: ['samuel george', 'beatrice ann'], level: 3},
//   {name: 'wilford', parents: ['samuel george', 'beatrice ann'], level: 3},
//   {name: 'laurence', parents: [], level: 3},
//   {name: 'samuel george', parents: [], level: 4},
//   {name: 'beatrice ann', parents: [], level: 4}
// ]

var {root, married} = convert(input)

display(root)