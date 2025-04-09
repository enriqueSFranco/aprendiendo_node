const net = require('node:net')

function findAvailablePort (diseredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(diseredPort, () => {
      const { port } = server.address()
      server.close(() => resolve(port))
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        setTimeout(function () {
          findAvailablePort(0)
            .then(port => resolve(port))
        }, 1000)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = { findAvailablePort }
