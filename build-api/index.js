const express = require('express')
const movies = require('./mocks/movies.json')

const app = express()
const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by')
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
  const { title, year, director, duration, poster, genre, rate } = req.body
  // VALIDAR LA INFORMACION
  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    title,
    year,
    director,
    duration,
    poster,
    genre,
    rate: rate ?? 0
  }

  movie.push(newMovie)

  res.status(201).json(newMovie) // actualizar la cache del cliente
})

app.use((req, res) => {
  res.status(404).send('not found 404')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
