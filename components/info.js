module.exports = function () {

  var container = document.createElement('div')
  container.id = 'details'
  Object.assign(container.style, {
    borderRadius: '10px',
    background: 'white',
    boxShadow: '0px 0px 13px 1px rgb(180,180,180)',
    width: '18%',
    height: '700px',
    marginLeft: '35px',
    marginTop: '30px',
    display: 'inline-block',
    overflow: 'hidden'
  })
  document.body.appendChild(container)

  var name = document.createElement('div')
  name.id = 'name'
  Object.assign(name.style, {
    paddingLeft: '20px',
    paddingTop: '20px',
    fontSize: '22px'
  })

  var born = document.createElement('div')
  born.id = 'born'
  Object.assign(born.style, {
    paddingLeft: '20px',
    paddingTop: '10px',
    fontSize: '16px',
    color: 'rgb(100,100,100)'
  })

  var died = document.createElement('div')
  died.id = 'died'
  Object.assign(died.style, {
    paddingLeft: '20px',
    paddingTop: '10px',
    fontSize: '16px',
    color: 'rgb(100,100,100)'
  })

  var about = document.createElement('div')
  about.id = 'about'
  Object.assign(about.style, {
    paddingLeft: '20px',
    paddingTop: '20px',
    fontSize: '16px',
    width: '80%'
  })

  function details () {}

  details.initialize = function () {
    container.appendChild(name)
    container.appendChild(born)
    container.appendChild(died)
    container.appendChild(about)
  }

  details.update = function (data) {
    name.innerHTML = data.name
    born.innerHTML = 'born ' + data.born
    died.innerHTML = 'died' + data.died
    about.innerHTML = data.about
  }

  details.initialize()

  return details
}
