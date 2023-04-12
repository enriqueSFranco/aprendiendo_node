import { users } from './api.js'

const $main = document.querySelector('main')

/**
 * @param {Array} users
 **/
function renderUserList (users) {
  const $template = document.getElementById('user-template').content
  const $fragment = document.createDocumentFragment()
  const $ul = document.createElement('ul')

  users.forEach(user => {
    const $textNode = document.createTextNode(user.username)
    const $span = document.createElement('span')
    const $li = document.createElement('li')

    $span.appendChild($textNode)

    $li.classList.add('wrapper-card')
    $template.querySelector('figure').classList.add('user-card')

    $template.querySelector('img').setAttribute('src', user.avatar)
    $template.querySelector('img').setAttribute('alt', user.username)
    $template.querySelector('img').setAttribute('loading', 'lazy')

    $template.querySelector('figcaption').appendChild($span)

    const $clone = document.importNode($template, true)

    $li.appendChild($clone)
    $fragment.appendChild($li)
    $textNode.textContent = ''
  })

  $ul.appendChild($fragment)
  $ul.classList.add('user-list')

  $main.append($ul)
}

function flujoDeEventos () {
  const $divs = document.querySelectorAll('.container-eventos div')

  $divs.forEach((div, index) => {
    // FASE DE BURBUJA - va del elemento mas interno al mas externo
    /* div.addEventListener('click', function (e) {
      console.log(`diste click en el div ${this.className}, el click lo origino ${e.target.className}`)
    }) */

    // FASE DE BURBUJA - va del elemento mas externo al mas interno (es mas optima)
    /* div.addEventListener('click', function (e) {
      console.log(`diste click en el div ${this.className}, el click lo origino ${e.target.className}`)
    }, true) */

    div.addEventListener('click', function (e) {
      console.log(`diste click en el div ${this.className}, el click lo origino ${e.target.className}`)
    }, {
      capture: true, // por defecto es false que es la FASE DE BURBUJA
      once: true // el evento solo se ejecuta una unica vez
    })
  })
}

document.addEventListener('DOMContentLoaded', function () {
  renderUserList(users)
  flujoDeEventos()
})
