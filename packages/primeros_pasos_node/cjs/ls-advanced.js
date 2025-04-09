const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] ?? '.'

async function ls (directory) {
  // listamos los archivos del directorio actual
  // PRIMERO VA EL ERROR
  let files
  try {
    files = await fs.readdir(directory)
  } catch (error) {
    console.error(`No se pudo leer el directorio ${directory}`)
    process.exit(1)
  }
  const filesPromises = files.map(async file => {
    // recuperamos la informacion de cada archivo
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath) // informacion del arhivo
    } catch (error) {
      console.error(`No se pudo leer el directorio ${directory}`)
      process.exit(1)
    }
    const isDirectory = await stats.isDirectory()
    const fileType = isDirectory ? 'd' : '[+]'
    const fileSize = await stats.size.toLocaleString()
    const fileModified = await stats.mtime.toLocaleString()

    return `${fileType} ${file} ${fileSize} ${fileModified}`
  })
  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)
