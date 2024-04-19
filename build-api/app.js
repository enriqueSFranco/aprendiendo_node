import { createRequire } from 'node:module'
import express, { json } from 'express'
import moviesRouter from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
// import movies from './mocks/movies.json' // <- es no es válido  
// import movies from './mocks/movies.json' assert { type: 'json' } <- experimental no esta estable y no existe

// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./mocks/movies.json', 'utf-8'))

// const require = createRequire(import.meta.url) // <- recomendada por ahora para cargar atchivos json
// const movies = require('./mocks/movies.json')

const app = express()
const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by') // ocultamos el encabezado X-Powered-By que por defecto revela la tecnología utilizada en el servidor
// se limita la cantidad de información que se expone sobre la infraestructura del servidor.
app.use(corsMiddleware()) // esto no esta del todo bien, ya que esta asignando a la cabecera Access-Control-Allow-Origin con el valor de *
app.use(json()) // middleware para poder usar la data del body cuando se usan los verbos PUT, PATCH, DELETE

// Todos los recursos que sean MOVIES se identifican con /movies
app.use('/movies', moviesRouter)

app.use((req, res) => {
  res.status(404).send('not found 404')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
