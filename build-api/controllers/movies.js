import { MovieModel } from '../models/local-file-system/movies.js'
import { validateMovie, validatePartialMovie } from '../schemas/movie.js'

export class MovieController {
  static async getAll (req, res) {
    // queryParams = [genre, search]
    const { genre } = req.query
    const filteredMovies = await MovieModel.getAllMovies({ genre })
    res.json(filteredMovies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getMovieById({ movieId: id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  static async create (req, res) {
    // const { title, year, director, duration, poster, genre, rate } = req.body <- recuperamos la informacion del body
    // VALIDAR LA INFORMACION <- NO LO ARREGLA TYPESCRIPT
    // DEBE SER ALGO QUE SE EJECUTE EN RUNTIME
    const result = validateMovie(req.body)

    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) })

    const newMovie = await MovieModel.createMovie({ payload: result.data })
    res.status(201).json(newMovie) // actualizar la cache del cliente
  }

  static async delete (req, res) {
    const { id } = req.params
    const deletedMovie = await MovieModel.deleteMovie({ movieId: id })

    if (!deletedMovie) return res.status(400).json({ message: 'Movie not found' })

    return res.status(200).json({ message: 'Movie deleted' })
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)

    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const { id } = req.params
    const updatedMovie = await MovieModel.updateMovie({ movieId: id, payload: result.data })

    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' })

    return res.json(updatedMovie)
  }
}