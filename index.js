d3 = require('d3')
const util = require('util')
convert = require('./convert')
convert2 = require('./convert2')

function disp (val) {
  console.log(util.inspect(val, false, null, true))
}

// var people = [
//   // {name: 'kk2', parents: ['sister', 'spouse'], level: 0},
//   // {name: 'kk3', parents: ['sister2', 'spouse2'], level: 0},
//   {name: 'sibling0',  parents: ['parent0', 'parent1'], level: 1},
//   {name: 'sibling1',  parents: ['parent0', 'parent1'], level: 1},
//   {name: 'sibling2',  parents: ['parent0', 'parent1'], level: 1},
//   {name: 'parent0',  parents: [], level: 2},
//   {name: 'parent1',  parents: [], level: 2}
// ]

// var pairs = []

// var input = [
//   {name: 'miniandrew', parents: ['andrew', 'girlfriend'], level: -1},
//   {name: 'girlfriend', parents: [], level: 0},
//   {name: 'andrew', parents: ['richard', 'marie'], level: 0},
//   {name: 'kk', parents: ['richard', 'marie'], level: 0},
//   {name: 'richard', parents: ['leonard', 'catherine'], level: 1},
//   {name: 'marie',  parents: ['barton', 'jean'], level: 1},
//   {name: 'liz', parents: ['barton', 'jean'], level: 1},
//   {name: 'leonard', parents: ['dora', 'lukas'], level: 2},
//   {name: 'catherine', parents: [], level: 2},
//   {name: 'barton', parents: [], level: 2},
//   {name: 'jean', parents: [], level: 2},
//   {name: 'dora', parents: [], level: 3},
//   {name: 'lukas', parents: [], level: 3}
// ]

// var input = [
//   {name: 'andrew', parents: ['richard', 'marie'], level: 0},
//   {name: 'kk', parents: ['richard', 'marie'], level: 0},
//   {name: 'brad', parents: ['jim', 'liz'], level: 0},
//   {name: 'sam', parents: ['brad', 'karen'], level: -1},
//   {name: 'emily', parents: ['brad', 'karen'], level: -1},
//   {name: 'karen', parents: [], level: 0},

//   {name: 'richard', parents: ['leonard', 'catherine'], level: 1},

//   {name: 'marie', parents: ['barton', 'jean'], level: 1},
//   //{name: 'cynthia', parents: ['barton', 'housekeeper'], level: 1},

//   {name: 'dick', parents: ['barton', 'jean'], step: true, level: 1},
//   {name: 'liz',  parents: ['barton', 'jean'], level: 1},
//   {name: 'jim',  parents: [], level: 1},
//   {name: 'emil', parents: ['dora', 'lukas'], level: 2},
//   {name: 'leonard', parents: ['dora', 'lukas'], level: 2},
//   {name: 'catherine', parents: ['james', 'annie'], level: 2},
//   {name: 'bill', parents: ['james', 'annie'], level: 2},
//   {name: 'richard pepper', parents: ['james', 'annie'], level: 2},
//   {name: 'barton', parents: ['marie swift', 'laurence'], level: 2},
//   {name: 'housekeeper', parents: [], level: 2},
//   {name: 'beatrice', parents: ['marie swift', 'laurence'], level: 2},
//   {name: 'frederick', parents: ['marie swift', 'laurence'], step: true, level: 2},
  
//   {name: 'paul', parents: ['marie swift', 'laurence'], step: true, level: 2},
//   {name: 'margurite', parents: ['marie swift', 'laurence'], level: 2},
//   {name: 'mary lynn', parents: ['marie swift', 'laurence'], level: 2},
//   {name: 'hulet', parents: [], level: 2},
//   {name: 'jean 2', parents: ['james andrew', 'honora'], level: 2},
//   {name: 'jean', parents: ['james andrew', 'honora'], level: 2},

//   {name: 'james andrew', parents: [], level: 3},
//   {name: 'honora', parents: [], level: 3},
//   {name: 'james', parents: [], level: 3},
//   {name: 'annie', parents: [], level: 3}, 
//   {name: 'dora', parents: [], level: 3},
//   {name: 'lukas', parents: [], level: 3}, 
//   {name: 'lawrence', parents: ['mary lynn', 'hulet'], level: 1}, 
//   {name: 'jimmy', parents: ['lilian frances', 'robert'], level: 2},
//   {name: 'marie swift', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'george a', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'cecil', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'edwin', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'samuel george II', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'robert mitchell', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'beatrice alice', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'margurite ellen', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'babe', parents: ['samuel george', 'beatrice ann'], level: 3},
  
//   // {name: 'anona', parents: ['samuel george', 'beatrice ann'], level: 3},
//   // {name: 'alma dean', parents: ['samuel george', 'beatrice ann'], level: 3},
//   {name: 'wilford', parents: ['samuel george', 'beatrice ann'], level: 3},
//   {name: 'lilian frances', parents: ['samuel george', 'beatrice ann'], level: 3},
//   {name: 'laurence', parents: [], level: 3},
//   {name: 'robert', parents: [], level: 3},
//   {name: 'samuel george', parents: [], level: 4},
//   {name: 'beatrice ann', parents: [], level: 4}
// ]

// var {root, married} = convert(input)
// married.push({source: {name: 'sibling1'}, target: {name: 'spouse1'}})
// married.push({source: {name: 'sibling2'}, target: {name: 'spouse2'}})
// married.push({source: {name: 'parent2'}, target: {name: 'parent3'}})
// married.push({source: {name: 'child3'}, target: {name: 'sibling0'}})
// married.push({source: {name: 'sibling1'}, target: {name: 'spouse3'}})
// married.push({source: {name: 'margurite'}, target: {name: 'paul'}})
// married.push({source: {name: 'jim'}, target: {name: 'liz'}})
// married.push({source: {name: 'brad'}, target: {name: 'karen'}})
// married.push({source: {name: 'james'}, target: {name: 'annie'}})
// married.push({source: {name: 'dick'}, target: {name: 'marie'}})
// married.push({source: {name: 'beatrice'}, target: {name: 'frederick'}})
// married.push({source: {name: 'mary lynn'}, target: {name: 'hulet'}})
// married.push({source: {name: 'lilian frances'}, target: {name: 'robert'}})
// //married.push({source: {name: 'barton'}, target: {name: 'housekeeper'}})


// var root = { name: '',
//   id: 8,
//   hidden: true,
//   children:
//    [ 
//    { name: '', hidden: true, id: 25, no_parent: true, children: [
//       { name: '', hidden: true, id: 25, no_parent: false, children: [
//         { name: 'child4', id: 26, no_parent: false },
//       ] },
//     ] },
//    { name: 'parent2', id: 26, no_parent: true },
//    { name: '', hidden: true, id: 25, no_parent: true, children: [
//       { name: 'child3', id: 26, no_parent: false },
//     ] },
//     { name: '', hidden: true, id: 25, no_parent: true, children: [
//       { name: '', hidden: true, id: 25, no_parent: true, children: [
//         { name: 'child5', id: 26, no_parent: false },
//       ] },
//     ] },
//    { name: 'parent3', id: 27, no_parent: true },
//    { name: 'parent0', id: 28, no_parent: true },
//      { name: '',
//        hidden: true,
//        id: 6,
//        no_parent: true,
//        children:
//         [ 
//           { name: 'sibling0', id: 2, no_parent: false },
//           { name: 'spouse1', id: 3, no_parent: true },
//           { name: '', hidden: true, id: 29, no_parent: true, children: [
//             { name: 'child0', id: 7, no_parent: false },
//           ] },
//           { name: 'sibling1', id: 2, no_parent: false },
//           { name: '', hidden: true, id: 30, no_parent: true, children: [
//             { name: 'child6', id: 7, no_parent: false },
//           ] },
//           { name: 'spouse3', id: 2, no_parent: true },
//           { name: 'sibling2', id: 4, no_parent: false },
//           { name: '', hidden: true, id: 30, no_parent: true, children: [
//             { name: 'child1', id: 7, no_parent: false },
//           ] },
//           { name: 'spouse2', id: 5, no_parent: true } ] },
//      { name: 'parent1', id: 7, no_parent: true } ] }

// display(root)

// var people = [
//   {name: 'child0', parents: ['sibling1', 'spouse1'], level: 0},
//   {name: 'child1', parents: ['sibling2', 'spouse2'], level: 0},
//   {name: 'child4', parents: [], level: 0},
//   {name: 'child5', parents: ['child3', 'sibling0'], level: 0},
//   {name: 'child6', parents: ['sibling1', 'spouse3'], level: 0},
//   {name: 'sibling1',  parents: ['parent0', 'parent1'], level: 1},
//   {name: 'spouse1', parents: [], level: 1},
//   {name: 'spouse2',  parents: [], level: 1},
//   {name: 'sibling2',  parents: ['parent0', 'parent1'], level: 1},
//   {name: 'sibling0',  parents: ['parent0', 'parent1'], level: 1},
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

var people = [
  {name: 'sam', parents: ['brad', 'karen'], level: 0},
  {name: 'emily', parents: ['brad', 'karen'], level: 0},
  {name: 'brad', parents: ['jim', 'liz'], level: 1},
  {name: 'karen', parents: [], skip: true, level: 1},
  {name: 'andrew', parents: ['richard', 'marie'], level: 1},
  {name: 'kk', parents: ['richard', 'marie'], level: 1},
  {name: 'cheri', parents: ['marie', 'dick'], level: 1},
  {name: 'richard', parents: ['leonard', 'catherine'], level: 2},
  {name: 'marie',  parents: ['barton', 'jean'], level: 2},
  {name: 'liz', parents: ['barton', 'jean'], level: 2},
  {name: 'jim',  parents: [], order: -1, level: 2},
  {name: 'dick', parents: [], order: 0, level: 2},
  {name: 'cynthia', parents: ['barton', 'housekeeper'], level: 2},
  {name: 'lawrence', parents: ['mary lynn', 'hulet'], level: 1},
  {name: 'catherine', parents: ['james', 'annie'], level: 3},
  {name: 'bill', parents: ['james', 'annie'], level: 3},
  {name: 'richard pepper', parents: ['james', 'annie'], level: 3},
  {name: 'emil', parents: ['dora', 'lukas'], level: 3},
  {name: 'leonard', parents: ['dora', 'lukas'], level: 3},
  {name: 'barton', parents: ['marie swift', 'laurence'], level: 3},
  {name: 'housekeeper', parents: [], order: 0, level: 3},
  {name: 'mary lynn', parents: ['marie swift', 'laurence'], level: 3},
  {name: 'beatrice', parents: ['marie swift', 'laurence'], level: 3},
  {name: 'frederick', parents: [], level: 3},
  {name: 'margurite', parents: ['marie swift', 'laurence'], level: 3},
  {name: 'paul', parents: [], level: 3},
  {name: 'jean', parents: ['james andrew', 'honora'], level: 3},
  {name: 'jimmy', parents: ['lilian frances', 'robert'], level: 3},
  {name: 'hulet', parents: [], order: 0, level: 3},
  {name: 'james andrew', parents: [], level: 4},
  {name: 'honora', parents: [], level: 4},
  {name: 'dora', parents: [], level: 4},
  {name: 'lukas', parents: [], level: 4},
  {name: 'marie swift', parents: ['samuel george', 'beatrice ann'], level: 4},
  {name: 'george a', parents: ['samuel george', 'beatrice ann'], level: 4},
  {name: 'cecil', parents: ['samuel george', 'beatrice ann'], level: 4},
  {name: 'edwin', parents: ['samuel george', 'beatrice ann'], level: 4},
  {name: 'samuel george II', parents: ['samuel george', 'beatrice ann'], level: 4},
  {name: 'robert mitchell', parents: ['samuel george', 'beatrice ann'], level: 4},
  {name: 'beatrice alice', parents: ['samuel george', 'beatrice ann'], level: 4},
  {name: 'margurite ellen', parents: ['samuel george', 'beatrice ann'], level: 4},
  {name: 'babe', parents: ['samuel george', 'beatrice ann'], level: 4},
  {name: 'anona', parents: ['samuel george', 'beatrice ann'], level: 4},
  {name: 'alma dean', parents: ['samuel george', 'beatrice ann'], level: 4},
  {name: 'wilford', parents: ['samuel george', 'beatrice ann'], level: 4},
  {name: 'lilian frances', parents: ['samuel george', 'beatrice ann'], level: 4},
  {name: 'laurence', parents: [], level: 4},
  {name: 'robert', parents: [], level: 4},
  {name: 'james', parents: [], level: 4},
  {name: 'annie', parents: [], level: 4},
  {name: 'samuel george', parents: [], level: 5},
  {name: 'beatrice ann', parents: [], level: 5}
]

var pairs = [
  {married: ['marie', 'dick']},
  {married: ['frederick', 'beatrice']},
  {married: ['margurite', 'paul']}
]

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

// var people = [
//   {name: 'kk', parents: ['richard', 'marie'], level: 0},
//   {name: 'richard', parents: ['leonard', 'catherine'], level: 1},
//   {name: 'bastard', parents: ['leonard', 'wife'], level: 1},
//   {name: 'liz', parents: ['barton', 'jean'], level: 1},
//   {name: 'marie',  parents: ['barton', 'jean'], level: 1},
//   {name: 'catherine', parents: [], order: -1, level: 2},
//   {name: 'wife', parents: [], order: 1, level: 2},
//   {name: 'leonard', parents: ['dora', 'lukas'], level: 2},
//   {name: 'barton', parents: [], level: 2},
//   {name: 'jean', parents: [], level: 2},
//   {name: 'dora', parents: [], level: 3},
//   {name: 'lukas', parents: [], level: 3}
// ]

// var pairs = []

var {root, married} = convert2(people, pairs)

var el = document.createElement('div')
el.id = 'graph'
el.style.textAlign = 'center'
el.style.border = 'solid 1px black'
el.style.borderRadius = '10px'
el.style.width = '97%'
el.style.height = '500px'
el.style.margin = 'auto'
el.style.marginTop = '30px'
document.body.appendChild(el)

var details = document.createElement('div')
details.id = 'details'
details.style.border = 'solid 1px black'
details.style.borderRadius = '10px'
details.style.width = '97%'
details.style.height = '200px'
details.style.margin = 'auto'
details.style.marginTop = '30px'
document.body.appendChild(details)

var margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
}

var width = 1200
var height = 600

var kx = function (d) {
    return d.x
}

var ky = function (d) {
    return d.y
}

//thie place the text x axis adjust this to center align the text
var tx = function (d) {
    return d.x
}

//thie place the text y axis adjust this to center align the text
var ty = function (d) {
    return d.y + 25
}

//make an SVG
var svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("display", "block")
    .style("margin", "auto")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + margin.top + ")");

// Compute the layout
var tree = d3.tree().separation(separation).nodeSize([30, 70])
root = d3.hierarchy(root)

function collapse (d) {
  if (d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

//root.children.forEach(collapse)

// everything after this point needs to be recomputed
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
svg.selectAll(".link")
    .data(links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", elbow);

var circles = svg.selectAll(".node")
    .data(nodes)
    .enter();

//First draw sibling line with blue line
svg.selectAll(".married")
    .data(married)
    .enter().append("path")
    .attr("class", "married")
    .attr("d", marriedline);

// Create the node rectangles.
circles.append("circle")
    .attr("class", "node")
    .attr("r", function (d) {
      return 8
    })
    .attr("id", function (d) {
        return d.id;

    })
    .attr("display", function (d) {
        if (d.data.hidden & d.data.no_parent) {
            return "none"
        } else {
            return ""
        };
    })
    .attr("cx", kx)
    .attr("cy", ky)
    .attr('stroke-color', 'rgb(150,150,150)')
    // .on('click', function (d) {
    //   labels.attr('display', function (g) {
    //     if (d.data.name == g.data.name) {
    //       return ''
    //     } else {
    //       return 'none'
    //     }
    //   })
    //   labelsOutline.attr('display', function (g) {
    //     if (d.data.name == g.data.name) {
    //       return ''
    //     } else {
    //       return 'none'
    //     }
    //   })
    // })

var labels = circles.append("text")
    .text(function (d) {
        return d.data.name.split(' ')[0];
    })
    .attr("x", tx)
    .attr("y", ty)
    .attr("text-anchor", 'middle')
    .attr("font-size", "14px")
    .attr("stroke", "white")
    .attr("stroke-width", "6px")
    //.attr("display", "none")

var labelsOutline = circles.append("text")
    .text(function (d) {
        return d.data.name.split(' ')[0];
    })
    .attr("x", tx)
    .attr("y", ty)
    .attr("text-anchor", 'middle')
    .attr("font-size", "14px")
    //.attr("display", "none")


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

/*To make the nodes in flat mode.
This gets all teh nodes in same level*/
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
/** 
This draws the lines between nodes.
**/
function elbow(d, i) {
    if (d.target.data.no_parent) {
        return "M0,0L0,0";
    }
    var diff = d.source.y - d.target.y;
    //0.40 defines the point from where you need the line to break out change is as per your choice.
    var ny = d.target.y + diff * 0.50;

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

    var fun = d3.line().x(function (d) {
        return d.x;
    }).y(function (d) {
        return d.y;
    }).curve(d3.curveStepAfter)
    return fun(linedata);
}