module.exports = function () {

  var container = document.createElement('div')
  container.id = 'graph'
  Object.assign(container.style, {
    boxShadow: '0px 0px 13px 1px rgb(180,180,180)',
    textAlign: 'center',
    background: 'white',
    borderRadius: '10px',
    width: '75%',
    height: '700px',
    marginLeft: '30px',
    marginTop: '30px',
    overflowX: 'scroll',
    display: 'inline-block'
  })
  document.body.appendChild(container)

  return container
}
