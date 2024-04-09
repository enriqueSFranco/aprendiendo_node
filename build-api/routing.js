const http = require('node:http')

const PORT = process.env.PORT ?? 1234

const server = http.createServer((req, res) => { })

server.listen(PORT, () => {
  console.log(`server listening on PORT http://localhost:${PORT}`)
})