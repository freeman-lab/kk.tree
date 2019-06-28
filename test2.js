const convert2 = require('./convert2.js')

// given

var input = [
  {name: 'child0', parents: ['sibling1', 'spouse1'], level: 0},
  {name: 'child1', parents: ['sibling2', 'spouse2'], level: 0},
  {name: 'sibling0',  parents: ['parent0', 'parent1'], level: 1},
  {name: 'sibling1',  parents: ['parent0', 'parent1'], level: 1},
  {name: 'spouse1', parents: [], level: 1},
  {name: 'sibling2',  parents: ['parent0', 'parent1'], level: 1},
  {name: 'spouse2',  parents: [], level: 1},
  {name: 'parent0',  parents: [], level: 2},
  {name: 'parent1',  parents: [], level: 2}
]


// group by parent
// for anyone without parents and a spouse
// add them to the group with their spouse
// for any group where both parents are in the same group
// insert them into that group




// i want

convert2(input)

var root = { name: '',
  id: 8,
  hidden: true,
  children:
   [ { name: 'parent0', id: 0, no_parent: true },
     { name: '',
       hidden: true,
       id: 6,
       no_parent: true,
       children:
        [ { name: 'sibling0', id: 1, no_parent: false },
          { name: 'sibling1', id: 2, no_parent: false },
          { name: '', hidden: true, id: 0, no_parent: true, children: [
            { name: 'child0', id: 7, no_parent: false },
          ] },
          { name: 'spouse1', id: 3, no_parent: true },
          { name: 'sibling2', id: 4, no_parent: false },
          { name: '', hidden: true, id: 0, no_parent: true, children: [
            { name: 'child1', id: 7, no_parent: false },
          ] },
          { name: 'spouse2', id: 5, no_parent: true } ] },
     { name: 'parent1', id: 7, no_parent: true } ] }
