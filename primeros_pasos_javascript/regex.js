/*
  EXPRESIONES REGULARES
  SON SECUENCIAS DE CARACTERES QUE FORMAN UN PATRON
  DE BUSQUEDA
*/

const cadena = 'hola mundo'

const regex = new RegExp('mundo', 'g')
const regex2 = /hola/ig

console.log(regex.test(cadena)) // true
console.log(regex2.exec(cadena)) // [coincidencia, posicion, input]

/*
  Banderas
  g (global): busca todas las coincidencias en una cadena de texto
  "" (bandera en blanco): solo busca la primer coincidencia en la cadena de texto
  i: ignora entre mayusculas y minusculas
*/
