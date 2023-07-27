import fs, { stat } from 'node:fs' // file system

const stats = fs.statSync('./archivo.txt') // obtener informacion del archivo

export function initFs () {
  const isDirectory = stats.isDirectory() // es un directorio

  const isFile = stats.isFile() // es un fichero

  const symbolicLink = stats.isSymbolicLink() // es un enlace simbolico

  const sizeFile = stats.size() // tamaño del archivo
}