var people = [
  {name: 'sam', parents: ['brad', 'karen'], level: 0},
  {name: 'emily', parents: ['brad', 'karen'], level: 0},
  {name: 'brad', parents: ['jim', 'liz'], level: 1},
  {name: 'karen', parents: [], level: 1},
  {name: 'andrew', parents: ['richard', 'marie'], level: 1},
  {name: 'kk', parents: ['richard', 'marie'], level: 1},
  {name: 'cheri', parents: ['marie', 'dick'], level: 1},
  {name: 'son', parents: ['cynthia', 'husband'], level: 1},
  {name: 'daughter', parents: ['cynthia', 'husband'], level: 1},
  {name: 'richard', parents: ['leonard', 'catherine'], level: 2},
  {name: 'marie',  parents: ['barton', 'jean'], level: 2},
  {name: 'liz', parents: ['barton', 'jean'], level: 2},
  {name: 'jim',  parents: [], order: -1, level: 2},
  {name: 'dick', parents: [], order: 0, level: 2},
  {name: 'cynthia', parents: ['barton', 'housekeeper'], level: 2},
  {name: 'husband', parents: [], level: 2},
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
  {name: 'james andrew', parents: ['josephine', 'ec'], level: 4},
  {name: 'honora', parents: ['calvin lindsey', 'mary francis'], level: 4},
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
  {name: 'laurence', parents: ['talbot', 'lola'], level: 4},
  {name: 'robert', parents: [], level: 4},
  {name: 'james', parents: [], level: 4},
  {name: 'annie', parents: [], level: 4},
  {name: 'calvin lindsey', parents: [], level: 5},
  {name: 'mary francis', parents: [], level: 5},
  {name: 'josephine', parents: [], level: 5},
  {name: 'ec', parents: [], level: 5},
  {name: 'samuel george', parents: ['george r', 'mary anne'], level: 5},
  {name: 'beatrice ann', parents: [], level: 5},
  {name: 'talbot', parents: [], level: 5},
  {name: 'lola', parents: [], level: 5},
  {name: 'george r', parents: [], level: 6},
  {name: 'mary anne', parents: [], level: 6}
]

var pairs = [
  {married: ['marie', 'dick']},
  {married: ['frederick', 'beatrice']},
  {married: ['margurite', 'paul']},
  {married: ['cynthia', 'husband']}
]

var metadata = {
  'marie': {
    name: 'Marie LeFebvre',
    born: 1945,
    about: 'Grew up in Alpena, MI. Is really cool. Makes amazing smoked salmon dip.'
  },
  'dick': {
    name: 'Dick LeFebvre',
    born: 1950,
    about: 'Former governor of Alaska. Likes driving.'
  },
  'kk': {
    name: 'Katie Kent',
    born: 1990,
    about: 'Lives in San Francisco. Likes red pandas.'
  }
}

module.exports = {people: people, pairs: pairs, metadata: metadata}

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
