d3 = require('d3')
_ = require('lodash')
const util = require('util')
const build = require('./build')

function disp (val) {
  console.log(util.inspect(val, false, null, true))
}

var {people, pairs, metadata} = require('./examples/kk')
var {data, married} = build(people, pairs)

var graph = require('./components/graph')()
var info = require('./components/info')()

var margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
}

var width = 4000 // 3000
var height = 650
var duration = 250

var kx = function (d) {
    return d.x
}

var ky = function (d) {
    return d.y
}

var tx = function (d) {
    return d.x
}

var ty = function (d) {
    return d.y + 25
}

var svg = d3.select('#graph').append('svg')
    .attr('class', 'unselectable')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('display', 'block')
    .style('margin', 'auto')
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + margin.top + ')')

var tree = d3.tree().separation(separation).nodeSize([50, 70])
var root = d3.hierarchy(data)

root.x0 = 0
root.y0 = 0

var temp
root.descendants().forEach(function (d, i) {
  d.id = i
  d._children = d.children
  temp = _.filter(d.children, function (c) {
    return c.data.is_parent
  })
  if (d.children && (temp.length == d.children.length)) {
    d.data.is_collapsible = false
  } else {
    d.data.is_collapsible = true
  }
  d.children = collapse(d._children)
  d._expanded = false
})

update(root)

function update (source) {

  var nodes = root.descendants()
  var links = root.links()

  tree(root)

  // hacky handling of cousin marriage
  // by manually moving child
  // to the interaction of parents
  var temp1
  var temp2
  nodes.forEach(function (d) {
    if (d.data.cousin_marriage) {
      temp1 = _.find(nodes, function (n) {
        return n.data.name == d.data.parents[0]
      })
      temp2 = _.find(nodes, function (n) {
        return n.data.name == d.data.parents[1]
      })
      d.x = (temp1.x + temp2.x) / 2
    }
  })

  var knots = []
  married.forEach(function (d) {
    var start = nodes.filter(function (v) {
        if (d.source.name == v.data.name) return true
    })
    var end = nodes.filter(function (v) {
        if (d.target.name == v.data.name) return true
    })
    if ((start.length) > 0 && (end.length > 0)) {
      knots.push({source: start[0], target: end[0]})
    }
  })

  // create the line links
  var link = svg.selectAll('.link')
      .data(links, d => d.target.id)
  
  var linkEnter = link.enter().append('path')
      .attr('class', 'link')
      .attr('d', d => {
        const o = {x: source.x0, y: source.y0};
        return elbow({source: o, target: o});
      })

  link.merge(linkEnter)
      .attr('d', elbow)

  link.exit().remove()
      .attr('d', d => {
        const o = {x: source.x, y: source.y}
        return elbow({source: o, target: o})
      })

  var knot = svg.selectAll('.knot')
      .data(knots, d => d.target.id)

  var knotEnter = knot.enter().append('path')
      .attr('class', 'knot')
      .attr('d', d => {
        const o = {x: source.x0, y: source.y0};
        return elbow({source: o, target: o});
      })

  knot.merge(knotEnter)
      .attr('d', marriedline)

  knot.exit().remove()
      .attr('d', d => {
        const o = {x: source.x, y: source.y}
        return elbow({source: o, target: o})
      })

  var node = svg.selectAll('g')
      .data(nodes, d => d.id)

  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${source.x0},${source.y0})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .attr('id', function (d) {
        return d.id;
      })
      .attr('display', function (d) {
        if (ishidden(d)) return 'none' 
        return ''
      })
      .on('click', function (d) {
        if(metadata && metadata[d.data.name]) info.update(metadata[d.data.name])
        if (isparent(d)) {
          if (!d.data.is_collapsible) return
          if (d._expanded) {
            d.children = collapse(d._children)
            d._expanded = false
          } else {
            d.children = d._children
            d._expanded = true
          }
          update(d)
          updateCollapsers()
        }
      })

  var circles = nodeEnter.append('circle')
      .attr('class', 'circle')
      .attr('r', function (d) {
        if (isparent(d)) {
          if (!d.data.is_collapsible) return 4
          return d._expanded ? 8 : 8
        } else {
          return 10
        }
      })
      .attr('fill', function (d) {
        if (isparent(d)) return 'rgb(0,0,0)'
        return 'rgb(200,200,200)'
      })
      .attr('stroke', function (d) {
        if (isparent(d)) return 'rgb(0,0,0)'
        return 'rgb(100,100,100)'
      })

  var collapsers = nodeEnter.append('text')
      .text(function (d) {
          if (isparent(d)) {
            if (!d.data.is_collapsible) return ''
            return d._expanded ? '−' : '+'
          } else {
            return ''
          }
      })
      .attr('dy', '4.5')
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgb(255,255,255)')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .attr('class', 'collapser')

  nodeEnter.append('text')
      .text(function (d) {
          return d.data.name.split(' ')[0];
      })
      .attr('dy', '25')
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
    .clone(true).lower()
      .attr('stroke', 'white')
      .attr('stroke-width', '6px')
      .attr('stroke-linejoin', 'round')

  var nodeUpdate = node.merge(nodeEnter)
    .attr('transform', d => `translate(${d.x},${d.y})`)
    .attr('fill-opacity', 1)
    .attr('stroke-opacity', 1)

  var nodeExit = node.exit().remove()
    .attr('transform', d => `translate(${source.x},${source.y})`)
    .attr('fill-opacity', 0)
    .attr('stroke-opacity', 0)

  // draw lines between couples
  function marriedline(data) {
    var fun = d3.linkHorizontal()
      .x(function(d) { return d.x })
      .y(function(d) { return d.y })
    return fun(data)
  }

  updateCollapsers()

  function updateCollapsers () {
    circles
      .attr('r', function (d) {
        if (isparent(d)) {
          if (!d.data.is_collapsible) return 4
          return d._expanded ? 8 : 8
        } else {
          return 10
        }
      })
      
    collapsers
      .text(function (d) {
        if (isparent(d)) {
          if (!d.data.is_collapsible) return ''
          return d._expanded ? '−' : '+'
        } else {
          return ''
        }
      })
  }

  root.eachBefore(d => {
    d.x0 = d.x
    d.y0 = d.y
  })

}

// collapse children
function collapse (children) {
  var filtered
  filtered = _.filter(children, function (d) {
    return d.data.is_parent
  })
  if (filtered.length == 0) {
    filtered = null
  }
  return filtered
}

// is a node hidden
function ishidden (node) {
  if (node.data.hidden) {
    if (_.isArray(node.data.children)) {
      if (node.data.children[0].hidden || _.every(node.data.children, 'no_parent')) {
        return true
      }
    }
  }
  return false
}

// is a node a parent
function isparent (node) {
  if (node.data.hidden) {
    if (_.isArray(node.data.children)) {
      return true
    }
  }
  return false
}

// separation between nodes
function separation(a, b) {
  return a.parent == b.parent ? 1 : 1;
}

// flatten nodes
function flatten(root) {
    var n = [],
        i = 0;

    function recurse(node) {
        if (node.children) {
          node.children.forEach(recurse)
        } else {
          n.push(node);
        }
        if (!node.id) node.id = ++i;
        
    }
    recurse(root);
    return n;
}

function elbow (data) {
  if (data.target.data && data.target.data.no_parent) return 'M0,0L0,0'
  var fun = d3.linkVertical()
    .x(function(d) { return d.x })
    .y(function(d) { return d.y })
  return fun(data)
}

// draw the connecting lines
// function elbow(d, i) {
//     if (d.target.data && d.target.data.no_parent) {
//         return 'M0,0L0,0'
//     }
//     var diff = d.source.y - d.target.y;
//     //0.40 defines the point from where you need the line to break out change is as per your choice.
//     var ny = d.target.y + diff * 0.40;

//     linedata = [{
//         x: d.target.x,
//         y: d.target.y
//     }, {
//         x: d.target.x,
//         y: ny
//     }, {
//         x: d.source.x,
//         y: d.source.y
//     }]

//     linedata = {
//       source: {x: d.target.x, y: d.target.y},
//       target: {x: d.source.x, y: d.source.y},
//     }

//     var fun = d3.linkVertical().x(function (d) {
//         return d.x;
//     }).y(function (d) {
//         return d.y;
//     })
//     return fun(linedata);
// }