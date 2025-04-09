import express from 'express'

import { upload } from './middlewares/multer.js'
import { checkTypeFile } from './utils/validate-file.js'
import { corsMiddleware } from './middlewares/cors.js'
import { CSVToJSONTransformer } from './utils/csv-to-json-transformer.js'

let userData: Array<Record<string, string>> = []

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(corsMiddleware())

app.post('/api/files', upload.single('file'), (req, res) => {
  const { file } = req

  if (!file) {
    return res.status(400).json({ message: 'File is required' })
  }

  const isValid = checkTypeFile(file)

  if (!isValid)
    return res.status(500).json({ message: 'The file must be csv.' })

  userData = CSVToJSONTransformer(file)
  return res.status(200).json({ data: userData, message: 'The file was uploaded successfully' })
})

app.get('/api/users', (req, res) => {
  const { q } = req.query

  if (!q) return

  const query = q.toString().toLowerCase()

  const filterData = userData.filter(row => {
    const values = Object.values(row).some(val => val.toLocaleLowerCase().includes(query))
    return values
  })

  if (!filterData)
    return res.status(500).json({ message: 'No results found' })

  return res.status(200).json({ data: filterData })
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})