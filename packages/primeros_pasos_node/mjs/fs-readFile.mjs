import fs from 'node:fs'

// callbacks funciones que se ejecutan cuando una tarea asyncrona a terminado

export function initReadFileSync () {
  console.log('leyendo el primer archivo')
  // retorna un buffer de memoria
  // utilizamos utf-8 para entender el texto del archivo
  const text = fs.readFileSync('./archivo.txt', 'utf-8') // cargamos el archivo de forma sincrona (secuencial)

  console.log(text)
  console.log('hacer otras cosas mientras lee el archivo')

  console.log('leyendo el segundo archivo')
  const secondText = fs.readFileSync('./archivo2.txt', 'utf-8')
  console.log(secondText)
}

export function initReadFileAsync () {
  console.log('leyendo el primer archivo')
  // retorna un buffer de memoria
  // utilizamos utf-8 para entender el texto del archivo
  fs.readFile('./archivo.txt', 'utf-8', (err, data) => console.log(data)) // cargamos el archivo de forma asincrona

  console.log('hacer otras cosas mientras lee el archivo')

  console.log('leyendo el segundo archivo')
  fs.readFile('./archivo2.txt', 'utf-8', (err, data) => {
    console.log(data)
  })
}
