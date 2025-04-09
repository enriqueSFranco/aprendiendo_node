const fs = require('node:fs/promises')

// EN COMMON JS NO PODEMOS USAR ASYNC PORQUE NO TIENE ACCESO AL ASYNC

async function initReadFileAsyncCommon () {
  console.log('leyendo el primer archivo')
  // retorna un buffer de memoria
  // utilizamos utf-8 para entender el texto del archivo
  const text = await fs.readFile('./archivo.txt', 'utf-8')
  console.log('hacer otras cosas mientras lee el archivo')
  console.log(text)


  console.log('leyendo el segundo archivo')
  const secondText = await fs.readFile('./archivo2.txt', 'utf-8')
  console.log(secondText)

}

module.exports = { initReadFileAsyncCommon }

  // OTRA FORMA DE HACER ESTO ES USANDO UNA IIFE
  // ESO SE USA POR QUE EN ARCHIVOS QUE USAN COMMONJS NO SE PUEDE TENER ACCESO
  // AL ASYNC, ES DECIR, NO TIENE TOP-LEVEL-AWAIT Y PARA TENER ACCESO
  // AL ASYNC NOS AYUDAMOS DE UNA IIFE
  
  // ;(async () => {
  //   console.log('leyendo el primer arhcivo...')
  //   const text = fs.readFile('./archivo.txt', 'utf-8')
  //   console.log('hacemos otras cosas')
  //   console.log(text)

  //   const secondText = fs.readFile('archivo2.txt', 'utf-8')
  //   console.log(secondText)
  // })()