export function delegacionEventos () {
  console.info('DELEGACION DE EVENTOS')
  document.addEventListener('click', function (e) {
    if (e.target.matches('selector')) {
      console.log('click en: ', e.target)
    }
  })
}
