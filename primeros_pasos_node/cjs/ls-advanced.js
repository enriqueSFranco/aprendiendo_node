const fs = require('node:fs')

const folder = process.argv[2] || '.'

// listamos los archivos del directorio actual
// PRIMERO VA EL ERROR
fs.readdir('.', (err, files) => {
  if (err instanceof Error) {
    console.error('Error ', err.code, ': ', err.message)
    return
  }
  files.forEach(file => {
    console.log(file)
  })
})