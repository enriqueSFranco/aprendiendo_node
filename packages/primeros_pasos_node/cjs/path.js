const path = require('node:path')

// nunca construir las rutas de esta forma:
// ruta1/ruta2/ruta3 ❌
// esto es por el s.o, ya que:
// -> unix /
// -> windows \

console.log(path.sep) // barra separadora segun s.o

const filePath = path.join('src', 'components', 'Header.tsx') // forma la ruta src/components/Header.tsx
console.log(filePath)

const base = path.basename('src/components/Header.tsx') // obtiene el nombre del fichero -> Header.tsx
console.log(base)

const filename = path.basename('src/components/Header.tsx', '.tsx') // obtiene el nombre del fichero sin la extension -> Header
console.log(filename)

const extension = path.extname('image.png') // obtener la extension del archivo
console.log(extension)

