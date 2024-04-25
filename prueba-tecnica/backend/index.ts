import express from 'express'
import cors from 'cors'
import formidable from 'formidable'

const localStore = []

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())

app.post('/api/files', (req, res, next) => {
  const form = formidable({ multiples: false })

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ data: null, message: '' })
    }
    const file = files.files
    console.log(file)
    res.status(200).json({ data: [], message: 'El archivo se cargó correctamente.' })
  })
})

app.get('/api/users', (req, res) => {

})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})