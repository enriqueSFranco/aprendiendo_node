const express = require('express')

const app = express()
const PORT = process.env ?? 1234

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send('hello world')
})


app.use((req, res) => {
  res.status(404).send('not found 404')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${port}`)
})
