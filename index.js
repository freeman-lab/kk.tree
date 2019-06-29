d3 = require('d3')
_ = require('lodash')
const util = require('util')
const build = require('./build')

function disp (val) {
  console.log(util.inspect(val, false, null, true))
}

var {people, pairs, metadata} = require('./examples/kk')
var {root, married} = build(people, pairs)

var graph = require('./components/graph')()
var info = require('./components/info')()

var margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
}

var width = 3000
var height = 650

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
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('display', 'block')
    .style('margin', 'auto')
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + margin.top + ')');

var tree = d3.tree().separation(separation).nodeSize([50, 70])
root = d3.hierarchy(root)

// function collapse (d) {
//   if (d.children) {
//     d._children = d.children
//     d._children.forEach(collapse)
//     d.children = null
//   }
// }

// root.children.forEach(collapse)

tree(root)
var links = root.links()
var nodes = root.descendants()
var flattened = flatten(root)

flattened.forEach(function (d) { delete d.parent })
flattened.forEach(function (d) { d.y = d.depth * 70 })

function separation(a, b) {
  return a.parent == b.parent ? 1 : 1;
}

// Create the link lines.
svg.selectAll('.link')
    .data(links)
    .enter().append('path')
    .attr('class', 'link')
    .attr('d', elbow);

var circles = svg.selectAll('.node')
    .data(nodes)
    .enter()

svg.selectAll('.married')
    .data(married)
    .enter().append('path')
    .attr('class', 'married')
    .attr('d', marriedline);

var markers = circles.append('circle')
    .attr('class', 'node')
    .attr('r', function (d) {
      if (isparent(d)) return 3
      return 8
    })
    .attr('fill', function (d) {
      if (isparent(d)) return 'rgb(0,0,0)'
      return 'rgb(200,200,200)'
    })
    .attr('id', function (d) {
      return d.id;
    })
    .attr('display', function (d) {
      if (ishidden(d)) return 'none' 
      return ''
    })
    .attr('cx', kx)
    .attr('cy', ky)
    .attr('stroke', function (d) {
      if (isparent(d)) return 'rgb(0,0,0)'
      return 'rgb(100,100,100)'
    })
    .on('click', function (d) {
      if(metadata[d.data.name]) info.update(metadata[d.data.name])
      if (isparent(d)) {
        console.log(d)
      }
    })
    .on('mouseover', function (d) {
      if (metadata[d.data.name]) {
        markers.attr('r', function (g) {
          if (isparent(g)) return 3
          else {
            if (d.data.name == g.data.name) {
              return 10
            } else {
              return 8
            }
          }
        })
      }
    })
    .on('mouseout', function (d) {
      markers.attr('r', function (g) {
        if (isparent(g)) return 3
        return 8
      })
    })

var labels = circles.append('text')
    .text(function (d) {
        return d.data.name.split(' ')[0];
    })
    .attr('x', tx)
    .attr('y', ty)
    .attr('text-anchor', 'middle')
    .attr('font-size', '14px')
    .attr('stroke', 'white')
    .attr('stroke-width', '6px')
    //.attr('display', 'none')

var labelsOutline = circles.append('text')
    .text(function (d) {
        return d.data.name.split(' ')[0];
    })
    .attr('x', tx)
    .attr('y', ty)
    .attr('text-anchor', 'middle')
    .attr('font-size', '14px')
    //.attr('display', 'none')


/**
This defines teh line between siblings.
**/
function marriedline(d, i) {
    //start point
    var start = flattened.filter(function (v) {
        if (d.source.name == v.data.name) {
            return true;
        } else {
            return false;
        }
    });
    //end point
    var end = flattened.filter(function (v) {
        if (d.target.name == v.data.name) {
            return true;
        } else {
            return false;
        }
    });
    //define teh start coordinate and end co-ordinate
    var linedata = [{
        x: start[0].x,
        y: start[0].y
    }, {
        x: end[0].x,
        y: end[0].y
    }];
    var fun = d3.line().x(function (d) {
        return d.x;
    }).y(function (d) {
        return d.y;
    }).curve(d3.curveStepAfter)
    return fun(linedata);
}

// is a node hidden
function ishidden (node) {
  if (node.data.hidden) {
    if (_.isArray(node.data.children)) {
      if (node.data.children[0].hidden || node.data.children[0].no_parent) {
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

// draw the connecting lines
function elbow(d, i) {
    if (d.target.data.no_parent) {
        return 'M0,0L0,0';
    }
    var diff = d.source.y - d.target.y;
    //0.40 defines the point from where you need the line to break out change is as per your choice.
    var ny = d.target.y + diff * 0.40;

    linedata = [{
        x: d.target.x,
        y: d.target.y
    }, {
        x: d.target.x,
        y: ny
    }, {
        x: d.source.x,
        y: d.source.y
    }]

    linedata = {
      source: {x: d.target.x, y: d.target.y},
      target: {x: d.source.x, y: d.source.y},
    }

    var fun = d3.linkVertical().x(function (d) {
        return d.x;
    }).y(function (d) {
        return d.y;
    })
    return fun(linedata);
}