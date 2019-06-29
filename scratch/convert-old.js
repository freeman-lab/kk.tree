const _ = require('lodash')
const util = require('util')

function display (val) {
  console.log(util.inspect(val, false, null, true))
}

//display(build(input))

module.exports = build

function build (input) {

  var subtree
  var iter
  var id = 0
  var children = []
  var max = _.maxBy(input, 'level').level
  var groups = _.groupBy(input, 'parents')

  display(groups)

  

  // get couples
  var couple
  var married = []
  _.forEach(groups, function (v, k) {
    if (k != '') {
      couple = k.split(',')
      couple = {source: {name: couple[0]}, target: {name: couple[1]}}
      married.push(couple)
    }
  })

  // convert to an array
  var raw = []
  _.forEach(groups, function (v, k) {
    if (k == '') {
      _.forEach(v, function (d) {
        if (d.level < max) {
          raw.push([d])
        } else {
          raw.push(d)
        }
      })
    } else {
      raw.push(v)
    }
  })

  display(raw)

  var ordered = sort(raw, max)

  // build the tree
  _.forEach(ordered, function (g) {
    if (!_.isArray(g)) {
      subtree = {
        name: g.name,
        id: id,
        no_parent: true
      }
      id += 1
      children.push(subtree)
    } else {
      subtree = []
      _.forEach(g, function (d) {
        child = {
          name: d.name,
          id: id,
          no_parent: ((d.parents.length == 0) || (d.step))? true : false
        }
        id += 1
        subtree.push(child)
      })
      iter = g[0].level
      while (iter < max) {
       subtree = {
         name: '',
         hidden: true,
         id: id,
         no_parent: true,
         children: _.isArray(subtree) ? subtree : [subtree]
       }
       id += 1
       iter += 1
      }
      children.push(subtree)
    }
  })

  var root = {
    name: '',
    id: id,
    hidden: true,
    children: children
  }

  return {root: root, married: married}
}

function sort (input, max) {

  var level = -1
  var iter = 0

  // loop over levels
  // for each level keep finding nodes that need to be reordered
  // when no more are found advance to the next level
  while ((level < max) & iter < 1000) {
    var selected = _.findIndex(input, function (d, k) {
      if (getLevel(d) == level) {
        var parents = getParents(input[k])
        if ((parents.length > 0) &&
            (!((parents[0] <= (k - 1)) && (parents[1] >= (k + 1)))) &&
            (!((parents[0] >= (k + 1)) && (parents[1] <= (k - 1))))) {
          return true
        } 
      }
    })

    display('iter ' + iter)
    display('current:')
    display(input)
    display('selected:')
    display(input[selected])

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

  // get the indices of the parents of a node
  function getParents (d) {
    var parents
    if (_.isArray(d)) {
      parents = d[0].parents
    } else {
      parents = d.parents
    }
    var indices = []
    _.forEach(input, function (d, k) {
      var bool
      if (_.isArray(d)) {
        _.forEach(d, function (dd) {
          if (_.includes(parents, dd.name)) {
            indices.push(k)
          }
        })
      } else {
        if (_.includes(parents, d.name)) {
          indices.push(k)
        }
      }
    })
    return indices
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