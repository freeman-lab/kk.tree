var people = [
  {name: 'child0', parents: ['sibling0', 'spouse0'], level: 0},
  {name: 'child1', parents: ['sibling1', 'spouse1'], level: 0},
  {name: 'sibling0',  parents: ['parent0', 'parent1'], level: 1},
  {name: 'spouse0',  parents: [], level: 1},
  {name: 'sibling1',  parents: ['parent0', 'parent1'], level: 1},
  {name: 'spouse1',  parents: [], level: 1},
  {name: 'sibling2',  parents: ['parent0', 'parent1'], level: 1},
  {name: 'parent0',  parents: [], level: 2},
  {name: 'parent1',  parents: [], level: 2}
]

var pairs = []

module.exports = {people: people, pairs: pairs}