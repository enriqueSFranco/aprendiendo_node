import fs from 'node:fs/promises'

// SI NO SE PUEDE USAR 'node:fs/promises'
// PORDEMOS USAR: const { promisify } = required('node:util')
// NOTE: SOLO DEBEMOS USARLO CUANDO LA VERSION DE NODE NO TENGA SOPORTE PARA PROMESAS

// SINCRONO DA PROBLEMAS POR QUE BLOQUEA LAS TAREAS
// ES MEJOR USAR ASYNCRONO

export function initReadFileAsyncPromise () {
  console.log('leyendo el primer archivo')
  // retorna un buffer de memoria
  // utilizamos utf-8 para entender el texto del archivo
  fs.readFile('./archivo.txt', 'utf-8')
    .then(data => console.log(data))
    .catch(error => console.error(error))

  console.log('hacer otras cosas mientras lee el archivo')


  console.log('leyendo el segundo archivo')
  fs.readFile('./archivo2.txt', 'utf-8')
    .then(data => console.log(data))
    .catch(error => console.error(error))
}