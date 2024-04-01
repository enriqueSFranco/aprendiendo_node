import { createServer } from 'node:http'

import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'

const PORT = process.env.PORT || 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {

  }
})

app.use(logger('dev'))

io.on('connection', client => {
  console.log('a client has connected!')

  client.on('disconnect', () => {
    console.log('a client has disconnect!')
  })

  client.on('chat-message', (msg) => {
    console.log('msg:', msg)
    io.emit('chat-message', msg)
  })
})

app.get('/', (_req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})


server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
