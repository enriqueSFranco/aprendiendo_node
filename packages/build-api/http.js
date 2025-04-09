const http = require('node:http') // protocolo http

const PORT = process.env.PORT ?? 1234

const server = http.createServer((req, res) => {
  console.log('request received', req.url)
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200
    res.end('hola mundo')
  } else if (req.url === '/users') {
    res.statusCode = 200
    res.end('users')
  }
})

server.listen(PORT, () => {
  console.log(`server listening on PORT http://localhost:${PORT}`)
})