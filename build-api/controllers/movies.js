import { validateMovie, validatePartialMovie } from '../schemas/movie.js'

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    // queryParams = [genre, search]
    const { genre } = req.query
    const filteredMovies = await this.movieModel.getAllMovies({ genre })
    res.json(filteredMovies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getMovieById({ movieId: id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  create = async (req, res) => {
    // const { title, year, director, duration, poster, genre, rate } = req.body <- recuperamos la informacion del body
    // VALIDAR LA INFORMACION <- NO LO ARREGLA TYPESCRIPT
    // DEBE SER ALGO QUE SE EJECUTE EN RUNTIME
    const result = validateMovie(req.body)

    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) })

    const newMovie = await this.movieModel.createMovie({ payload: result.data })
    res.status(201).json(newMovie) // actualizar la cache del cliente
  }

  delete = async (req, res) => {
    const { id } = req.params
    const deletedMovie = await this.movieModel.deleteMovie({ movieId: id })

    if (!deletedMovie) return res.status(400).json({ message: 'Movie not found' })

    return res.status(200).json({ message: 'Movie deleted' })
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const { id } = req.params
    const updatedMovie = await this.movieModel.updateMovie({ movieId: id, payload: result.data })

    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' })

    return res.json(updatedMovie)
  }
}