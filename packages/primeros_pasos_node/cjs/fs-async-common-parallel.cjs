const { readFile } = require('node:fs/promises')

// EN COMMON JS NO PODEMOS USAR ASYNC PORQUE NO TIENE ACCESO AL ASYNC

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('primer text', text)
  console.log('segundo texto', secondText)
})

