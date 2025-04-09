export function flujoDeEventos () {
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
