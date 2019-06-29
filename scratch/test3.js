const convert2 = require('./convert2.js')

// given

// var people = [
//   {name: 'child0', parents: ['sibling1', 'spouse1'], level: 0},
//   {name: 'child1', parents: ['sibling2', 'spouse2'], level: 0},
//   {name: 'child4', parents: [], level: 0},
//   {name: 'child5', parents: ['child3', 'sibling0'], level: 0},
//   {name: 'child6', parents: ['sibling1', 'spouse3'], level: 0},
//   {name: 'sibling0',  parents: ['parent0', 'parent1'], level: 1},
//   {name: 'sibling1',  parents: ['parent0', 'parent1'], level: 1},
//   {name: 'spouse1', parents: [], level: 1},
//   {name: 'spouse2',  parents: [], level: 1},
//   {name: 'sibling2',  parents: ['parent0', 'parent1'], level: 1},
//   {name: 'spouse3',  parents: [], level: 1},
//   {name: 'child3', parents: ['parent2', 'parent3'], level: 1},
//   {name: 'parent0',  parents: [], level: 2},
//   {name: 'parent1',  parents: [], level: 2},
//   {name: 'parent2',  parents: [], level: 2},
//   {name: 'parent3',  parents: [], level: 2}
// ]

// var pairs = [
//   {married: ['spouse1', 'sibling1']},
//   {married: ['spouse2', 'sibling2']},
//   {married: ['spouse3', 'sibling1']},
//   {married: ['child3', 'sibling0']}
// ]

// var people = [
//   {name: 'kk', parents: ['richard', 'marie'], level: 0},
//   {name: 'richard', parents: ['leonard', 'catherine'], level: 1},
//   {name: 'liz', parents: ['barton', 'jean'], level: 1},
//   {name: 'marie',  parents: ['barton', 'jean'], level: 1},
//   {name: 'leonard', parents: ['dora', 'lukas'], level: 2},
//   {name: 'wife', parents: [], level: 2},
//   {name: 'catherine', parents: [], level: 2},
//   {name: 'barton', parents: [], level: 2},
//   {name: 'jean', parents: [], level: 2},
//   {name: 'dora', parents: [], level: 3},
//   {name: 'lukas', parents: [], level: 3}
// ]

// var pairs = [
//   {married: ['leonard', 'wife']}
// ]

// var pairs = [
//   {married: ['richard', 'marie']},
//   {married: ['leonard', 'catherine']},
//   {married: ['barton', 'jean']},
//   {married: ['dora', 'lukas']}
// ]

// real world example good for testing sibling order problem

var people = [
  {name: 'kk', parents: ['richard', 'marie'], level: 0},
  {name: 'richard', parents: ['leonard', 'catherine'], level: 1},
  {name: 'bastard', parents: ['leonard', 'wife'], level: 1},
  {name: 'liz', parents: ['barton', 'jean'], level: 1},
  {name: 'marie',  parents: ['barton', 'jean'], level: 1},
  {name: 'catherine', parents: [], order: -1, level: 2},
  {name: 'leonard', parents: ['dora', 'lukas'], level: 2},
  {name: 'wife', parents: [], order: 1, level: 2},
  {name: 'barton', parents: [], level: 2},
  {name: 'jean', parents: [], level: 2},
  {name: 'dora', parents: [], level: 3},
  {name: 'lukas', parents: [], level: 3}
]

var pairs = []

// more complex real world

// var people = [
//   {name: 'andrew', parents: ['richard', 'marie'], level: 0},
//   {name: 'kk', parents: ['richard', 'marie'], level: 0},
//   {name: 'richard', parents: ['leonard', 'catherine'], level: 1},
//   {name: 'liz', parents: ['barton', 'jean'], level: 1},
//   {name: 'dick', parents: [], order: -1, level: 1},
//   {name: 'marie',  parents: ['barton', 'jean'], level: 1},
//   {name: 'catherine', parents: ['james', 'annie'], level: 2},
//   {name: 'bill', parents: ['james', 'annie'], level: 2},
//   {name: 'emil', parents: ['dora', 'lukas'], level: 2},
//   {name: 'leonard', parents: ['dora', 'lukas'], level: 2},
//   {name: 'barton', parents: ['marie swift', 'laurence'], level: 2},
//   {name: 'beatrice', parents: ['marie swift', 'laurence'], level: 2},
//   {name: 'frederick', parents: [], level: 2},
//   {name: 'margurite', parents: ['marie swift', 'laurence'], level: 2},
//   {name: 'paul', parents: [], level: 2},
//   {name: 'mary lynn', parents: ['marie swift', 'laurence'], level: 2},
//   {name: 'jean', parents: [], level: 2},
//   {name: 'dora', parents: [], level: 3},
//   {name: 'lukas', parents: [], level: 3},
//   {name: 'marie swift', parents: [], level: 3},
//   {name: 'laurence', parents: [], level: 3},
//   {name: 'james', parents: [], level: 3},
//   {name: 'annie', parents: [], level: 3}
// ]

// var pairs = [
//   {married: ['marie', 'dick']},
//   {married: ['frederick', 'beatrice']},
//   {married: ['margurite', 'paul']}
// ]

// group by parent
// for the empty group
//    add anyone there with a spouse to the group with their spouse
// starting with the lowest level (defined as the level for any exemplar from a group)
//    if both parents are shared in a group, insert into that group in between them as a triple
//    if not, skip
// all that should be list is the empty group (with a tree under it) a few random
//    side groups whose parents are in subtrees off the empty group
//    for those, find the nearest neighbors, and insert
// this should be the correct tree, just reformat appropriately, and we're done!


convert2(people, pairs)

var root = { name: '',
  id: 8,
  hidden: true,
  children:
   [ 
   { name: '', hidden: true, id: 25, no_parent: true, children: [
      { name: '', hidden: true, id: 25, no_parent: true, children: [
        { name: 'child4', id: 26, no_parent: false },
      ] },
    ] },
   { name: 'parent2', id: 26, no_parent: true },
   { name: '', hidden: true, id: 25, no_parent: true, children: [
      { name: 'child3', id: 26, no_parent: false },
    ] },
  { name: '', hidden: true, id: 25, no_parent: true, children: [
    { name: '', hidden: true, id: 25, no_parent: true, children: [
      { name: 'child5', id: 26, no_parent: false },
    ] },
  ] },
   { name: 'parent3', id: 27, no_parent: true },
   { name: 'parent0', id: 28, no_parent: true },
     { name: '',
       hidden: true,
       id: 6,
       no_parent: true,
       children:
        [ 
          { name: 'sibling0', id: 2, no_parent: false },
          { name: 'spouse1', id: 3, no_parent: true },
          { name: '', hidden: true, id: 29, no_parent: true, children: [
            { name: 'child0', id: 7, no_parent: false },
          ] },
          { name: 'sibling1', id: 2, no_parent: false },
          { name: 'sibling2', id: 4, no_parent: false },
          { name: '', hidden: true, id: 30, no_parent: true, children: [
            { name: 'child1', id: 7, no_parent: false },
          ] },
          { name: 'spouse2', id: 5, no_parent: true } ] },
     { name: 'parent1', id: 7, no_parent: true } ] }
