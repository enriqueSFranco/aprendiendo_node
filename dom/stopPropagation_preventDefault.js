export function stopPropagationPreventDefault () {
  const $divs = document.querySelectorAll('.container-stop-prevent div')
  const $link = document.querySelector('.container-stop-prevent div a')

  $divs.forEach(div => {
    div.addEventListener('click', function (e) {
      console.log(`click en ${this.className}, el evento lo origino ${e.target.className}`)
      e.stopPropagation()
    })
  })

  $link.addEventListener('click', function (e) {
    console.log('her')
    e.preventDefault()
  })
}
