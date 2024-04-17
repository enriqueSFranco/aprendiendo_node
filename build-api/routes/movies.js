import { Router } from "express"; // <- crea un enrutador para la app
// import { loadFile } from "../utils/load-file";
import { MovieModel } from '../models/movies.js';
import { MovieController } from '../controllers/movies.js';

const router = Router()
// filter = {year, genre, rate}
// const movies = loadFile('../mocks/movies.json')
router('/', MovieController.getAll)

router('/:id', (req, res) => {
  const { id } = req.params
  const movie = MovieModel.getMovieById(id)

  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

router('/movies', MovieController.getById)


router.delete('/:id', MovieController.delete)

// ACTUALIZAMOS SOLO UNA PARTE DE LA PELICULA
router.patch('/:id', MovieController.update)

export default router