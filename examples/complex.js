var people = [
  {name: 'child0', parents: ['sibling1', 'spouse1'], level: 0},
  {name: 'child1', parents: ['sibling2', 'spouse2'], level: 0},
  {name: 'child4', parents: [], level: 0},
  {name: 'child5', parents: ['child3', 'sibling0'], level: 0},
  {name: 'child6', parents: ['sibling1', 'spouse3'], level: 0},
  {name: 'sibling1',  parents: ['parent0', 'parent1'], level: 1},
  {name: 'spouse1', parents: [], level: 1},
  {name: 'spouse2',  parents: [], level: 1},
  {name: 'sibling2',  parents: ['parent0', 'parent1'], level: 1},
  {name: 'sibling0',  parents: ['parent0', 'parent1'], level: 1},
  {name: 'spouse3',  parents: [], level: 1},
  {name: 'child3', parents: ['parent2', 'parent3'], level: 1},
  {name: 'parent0',  parents: [], level: 2},
  {name: 'parent1',  parents: [], level: 2},
  {name: 'parent2',  parents: [], level: 2},
  {name: 'parent3',  parents: [], level: 2}
]

var pairs = [
  {married: ['spouse1', 'sibling1']},
  {married: ['spouse2', 'sibling2']},
  {married: ['spouse3', 'sibling1']},
  {married: ['child3', 'sibling0']}
]

module.exports = {people: people, pairs: pairs}