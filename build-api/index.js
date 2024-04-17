const express = require('express')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./schemas/movie.js')
const movies = require('./mocks/movies.json')

const app = express()
const PORT = process.env.PORT ?? 1234

const ACCEPTED_ORIGINS = [
  'http://127.0.0.1:3000',
  'http://locahost:1234',
  'http://127.0.0.1:5500',
  'https://movies.com',
]

const corsOptions = {
  origin: function (origin, callback) {
    if (ACCEPTED_ORIGINS.includes(origin))
      callback(null, true)

    if (!origin)
      callback(error, ACCEPTED_ORIGINS)

    return callback(new Error('Not allowed by CORS'))
  },
  optionsSuccessStatus: 200
}

app.disable('x-powered-by') // ocultamos el encabezado X-Powered-By que por defecto revela la tecnología utilizada en el servidor
// se limita la cantidad de información que se expone sobre la infraestructura del servidor.
app.use(cors(corsOptions)) // esto no esta del todo bien, ya que esta asignando a la cabecera Access-Control-Allow-Origin con el valor de *
app.use(express.json()) // middleware para poder usar la data del body cuando se usan los verbos PUT, PATCH, DELETE

app.get('/', (req, res) => {
  res.send('hello world')
})

// Todos los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
  res.json(movies)
})

app.get('/movies/:id', (req, res) => { // path-to-regexp
  const { id } = req.params
  const movie = movies.find(it => it.id === id)

  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.get('/movies', (req, res) => { // http://localhost:1234/movies?genre=Terror&search=slfj
  // queryParams = [genre, search]
  const { genre } = req.query

  if (genre) {
    const movie = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase())
    )
  }
})

app.post('/movies', (req, res) => {
  // const { title, year, director, duration, poster, genre, rate } = req.body <- recuperamos la informacion del body
  // VALIDAR LA INFORMACION <- NO LO ARREGLA TYPESCRIPT
  // DEBE SER ALGO QUE SE EJECUTE EN RUNTIME
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movie.push(newMovie)

  res.status(201).json(newMovie) // actualizar la cache del cliente
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params

  const movieIdx = movies.findIndex(movie => movie.id === id)

  if (movieIdx === -1) return res.status(404).json({ message: 'Movie not found' })

  movies.splice(movieIdx, 1)

  return res.status(200).json({ message: 'Movie deleted' })
})

// ACTUALIZAMOS SOLO UNA PARTE DE LA PELICULA
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

  const { id } = req.params
  const movieIdx = movies.findIndex(movie => movie.id === id)

  if (movieIdx === -1) return res.status(404).json({ message: 'Movie not found' })

  let movie = movies[movieIdx]
  const updatedMovie = {
    ...movie,
    ...result.data
  }
  movie = updatedMovie
  return res.json(updatedMovie)
})

app.use((req, res) => {
  res.status(404).send('not found 404')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
