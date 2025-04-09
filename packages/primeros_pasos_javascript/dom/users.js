/**
 * @param {Array} users
 * @param {HTMLElement} containerElement
 **/
export function renderUserList (containerElement, users) {
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

  containerElement.appendChild($ul)
}
