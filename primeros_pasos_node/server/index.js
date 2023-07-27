const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const PORT = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  console.log('request') // hace 2 peticiones porque recuper el contenido y el favicon
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  if (req.url === '/') {
    res.end('HOME')
  } else if (req.url === '/spiderman.jpeg') {
    // leemos la imagen
    const imgPath = path.join(__dirname, './spider-man.jpeg')
    fs.readFile(imgPath, (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('500 Internal Server Error')
      } else {
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data)
      }
    })
  }
}

const server = http.createServer(processRequest)

// al usar el puerto 0 va a buscar el primer puerto disponible
server.listen(PORT, () => console.log(`server listening on port ${PORT}`))
