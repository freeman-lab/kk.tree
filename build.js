const _ = require('lodash')
const util = require('util')

function display (val) {
  console.log(util.inspect(val, false, null, true))
}

module.exports = build

function build (people, pairs) {

  var subtree
  var iter
  var children = []
  var pairs = pairs ? pairs : []
  var max = _.maxBy(people, 'level').level
  var groups = _.groupBy(people, 'parents')

  // get couples
  var couple
  _.forEach(groups, function (v, k) {
    if (k != '') {
      couple = k.split(',')
      couple = {married: [couple[0], couple[1]]}
      pairs.push(couple)
    }
  })

  // for anyone in the empty group
  // add them to the group with their spouse
  var spouse
  var target
  var found
  var loc
  var cond1
  var cond2
  var cond3
  var foundIndex = 1
  while (foundIndex > -1) {
    foundIndex = _.findIndex(groups[''], function (d) {
      // has a spouse
      cond1 = _.some(_.map(pairs, function (p) {
        return _.includes(p.married, d.name)
      }))
      // spouse is in another group
      if (cond1) {
        target = findSpouse(pairs, d.name)
        cond2 = findGroup(groups, target) != ''
      }
      // other group has more than one child
      if (cond1 & cond2) {
        cond3 = groups[findGroup(groups, target)].length > 0
      }
      return ((cond1 & cond2) & cond3)
    })
    if (foundIndex == -1) break
    found = groups[''][foundIndex]
    target = findSpouse(pairs, found.name)
    loc = _.findIndex(groups[findGroup(groups, target)], function (d) {
      return d.name == target
    })
    if (found.order) {
      loc = loc + found.order
    }
    groups[findGroup(groups, target)].splice(loc + 1, 0, found)
    groups[''].splice(foundIndex, 1)
  }

  // go up the tree inserting groups of children
  // in between their parents
  var child
  var parents
  var nearest
  var diff
  var level = 0
  while (level < max) {
    child = _.findKey(groups, function (d) {
      return getLevel(d) == level
    })
    if (!child) {
      level += 1
    } else {
      parents = findGroupPair(groups, child.split(','))
      if (!(parents == -1)) {
        // parents entirely inside another group
        groups[parents] = insert(groups[parents], groups[child], child.split(','))
        delete groups[child]
      } else {
        // parents are split across groups so just add to main list for now
        groups[''].push(groups[child])
        delete groups[child]
      }
    }
  }

  groups[''] = sort(groups[''], max)
  
  // wrap elements in arrays based on depth
  var level
  var diff
  _.forEach(groups[''], function (d, k) {
    if (!(_.isArray(d))) {
      diff = max - d.level
      for (i = 0; i < diff; i++) { 
        groups[''][k] = [groups[''][k]]
      }
    } else {
      diff = max - d[0].level - 1
      for (i = 0; i < diff; i++) { 
        groups[''][k] = [groups[''][k]]
      }
    }
  })

  // insert a node between its parents
  function insert(parents, child, label) {
    var left
    var right
    left = _.findIndex(parents, ['name', label[0]])
    right = _.findIndex(parents, ['name', label[1]])
    if (left < right) {
      parents.splice(left + 1, 0, child)
    } else {
      parents.splice(right + 1, 0, child)
    }
    // alternate implementation that may reorder things
    // var insert = [parents[left], child, parents[right]]
    // parents[left] = []
    // parents[right] = []
    // parents.splice(left, 1, insert[0], insert[1], insert[2])
    // parents = _.filter(parents, function (d) {
    //   if (_.isArray(d) && d.length == 0) {
    //     return false
    //   } else {
    //     return true
    //   }
    // })
    return parents
  }

  function findSpouse(pairs, name) {
    var spouse = pairs[_.findIndex(_.map(pairs, function (p) {
      return _.includes(p.married, name)
    }))]
    if (spouse.married[0] == name) {
      return spouse.married[1]
    } else if (spouse.married[1] == name) {
      return spouse.married[0]
    }
  }

  // find group the target in
  function findGroup(groups, target) {
    return _.findKey(groups, function (g) {
      return _.some(g, function (gg) {
        return gg.name == target
      })
    })
  }

  // find group two targets are both in
  function findGroupPair(groups, targets) {
    var one
    var two
    var key = -1
    _.forEach(groups, function (g, k) {
      one = _.some(g, function (d) {
        return d.name == targets[0]
      })
      two = _.some(g, function (d) {
        return d.name == targets[1]
      })
      if (one & two) key = k
    })
    return key
  }

  // get the level of a node
  function getLevel (d) {
    var init
    init = d[0].level
    if (_.every(d, function (g) {
      if (_.isArray(g)) return true
      return g.level == init
    })) {
      return init
    } else {
      return
    }
  }

  function getLevelSimple (d) {
    if (_.isArray(d)) {
      return d[0].level
    } else {
      return d.level
    }
  }

  // build the tree
  function buildTree (array, root) {
    if (!root) {
      root = {
        name: '',
        hidden: true,
        no_parent: true,
        id: id
      }
      id += 1
    }
    var children = []
    _.forEach(array, function (d) {
      if (!_.isArray(d)) {
        subtree = {
          name: d.name,
          no_parent: (d.parents.length == 0) ? true : false,
          id: id
        }
        id += 1
        children.push(subtree)
      } else {
        subtree = buildTree(d)
        children.push(subtree)
      }
    })
    root.children = children
    return root
  }

  var id = 0
  var root = buildTree(groups[''])

  var married = _.map(pairs, function (d) {
    return {source: {name: d.married[0]}, target: {name: d.married[1]}}
  })

  //display(root)
  //display(married)

  return {root: root, married: married}
}

function sort (input, max) {

  var level = 0
  var iter = 0

  // loop over levels
  // for each level keep finding nodes that need to be reordered
  // when no more are found advance to the next level
  while ((level < max) & iter < 5000) {
    var selected = _.findIndex(input, function (d, k) {
      if (getLevel(d) == level) {
        var parents = getParents(input[k])
        if ((parents.length > 0) &&
            (!((parents[0] == (k - 1)) && (parents[1] == (k + 1)))) &&
            (!((parents[0] == (k + 1)) && (parents[1] == (k - 1))))) {
          return true
        } 
      }
    })

    // display('iter ' + iter)
    // display('current:')
    // display(input)
    // display('selected:')
    // display(input[selected])

    if (selected == -1) {
      level += 1
    } else {
      var parents = getParents(input[selected])
      input = insertParents(input, selected, parents)
    }

    iter += 1
  }

  return input

  // insert parents before and after the selected node
  function insertParents (val, selected, parents) {
    var insert = [val[parents[0]], val[selected], val[parents[1]]]
    val[parents[0]] = []
    val[parents[1]] = []
    val.splice(selected, 1, insert[0], insert[1], insert[2])
    val = _.filter(val, function (d) {
      if (_.isArray(d) && d.length == 0) {
        return false
      } else {
        return true
      }
    })
    return val
  }

  function getParents (d) {
    var parents
    var first
    var names
    if (_.isArray(d)) {
      first = _.find(d, function (p) {
        if (p.parents) {
          return p.parents.length > 0
        }
      })
      parents = first.parents
    } else {
      parents = d.parents
    }
    var indices = []
    _.forEach(input, function (v, k) {
      names = allNames(v)
      if ((_.includes(names, parents[0])) || (_.includes(names, parents[1]))) {
        indices.push(k)
      }
    })
    return indices
  }

  function allNames (v) {
    var names = []
    function recurse (n) {
      if (_.isArray(n)) {
        n.forEach(recurse)
      } else {
        names.push(n.name)
      }
    }
    recurse(v)
    return names
  }

  // get the level of a node
  function getLevel (d) {
    if (_.isArray(d)) {
      return d[0].level
    } else {
      return d.level
    }
  }
}