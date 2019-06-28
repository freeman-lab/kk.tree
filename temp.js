// what i need

var root = {
  name: '',
  id: 1,
  children: [
    {
      name: 'leonard',
      id: 2,
      no_parent: true
    },
    {
      name: '',
      id: 3,
      hidden: true,
      no_parent: true,
      children: [
        {
          name: 'richard',
          id: 5,
          no_parent: true
        }
      ]
    },
    {
      name: 'catherine',
      id: 4,
      no_parent: true
    }
  ]
}

// what i want to specify

var people = [
  {name: 'andrew', parents: ['richard', 'marie'], gen: 0},
  {name: 'kk', parents: ['richard', 'marie'], gen: 0},
  {name: 'richard', parents: [], gen: 1},
  {name: 'marie',  parents: [], gen: 1}
]

// start at lowest generation
// for children with common parents
// make children of a blank node
// 


var root = {
  name: '',
  children: [
    {
      name: 'richard',
      no_parent: true
    },
    {
      name: '',
      hidden: true,
      children: [
        {
          name: 'kk'
        },
        {
          name: 'andrew'
        }

      ]
    },
    {
      name: 'marie',
      no_parent: true
    }


  ]
}

var people = [
  {name: 'andrew', parents: ['richard', 'marie'], gen: 0},
  {name: 'kk', parents: ['richard', 'marie'], gen: 0},
  {name: 'richard', parents: ['leonard', 'catherine'], gen: 1},
  {name: 'marie',  parents: ['barton', 'jean'], gen: 1},
  {name: 'liz', parents: ['barton', 'jean'], gen: 1},
  {name: 'leonard', parents: [], gen: 2},
  {name: 'catherine', parents: [], gen: 2},
  {name: 'barton', parents: [], gen: 2},
  {name: 'jean', parents: [], gen: 2}
]



var people = [
  {name: 'andrew', parents: ['richard', 'marie'], gen: 0},
  {name: 'kk', parents: ['richard', 'marie'], gen: 0},
  {name: 'richard', parents: ['leonard', 'catherine'], gen: 1},
  {name: 'marie',  parents: ['barton', 'jean'], gen: 1},
  {name: 'liz', parents: ['barton', 'jean'], gen: 1},
  {name: 'leonard', parents: [], gen: 2},
  {name: 'catherine', parents: [], gen: 2},
  {name: 'barton', parents: ['marie', 'laurence'], gen: 2},
  {name: 'jean', parents: [], gen: 2},
  {name: 'marie', parents: [], gen: 3},
  {name: 'laurence', parents: [], gen: 3}
]













var generations = {
  0: [
      {
        name: 'andrew'
      },
      {
        name: 'kk'
      }
    ],
  1: [
      {
        name: 'richard',
      }
      {
        name: 'marie'
      }

  ]
}




var root = {
  children: [
    {
      name: 'kk'
    },
    {
      name: 'andrew'
    }
  ],
  parents: [
    {
      name: 'marie',
      parents: [
        {
          name: 'barton'
        },
        {
          name: 'marie'
        }
      ]
    },
    {
      name: 'richard'
    }
  ]
}