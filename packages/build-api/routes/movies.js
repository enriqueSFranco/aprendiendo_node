import { Router } from "express"; // <- crea un enrutador para la app
import { MovieController } from '../controllers/movies.js';

const router = Router()

export function createMovieRouter ({ model }) {
  const movieController = new MovieController({ movieModel: model })

  router.get('/', movieController.getAll)
  router.get('/:id', movieController.getById)

  router.post('/', movieController.create)
  router.delete('/:id', movieController.delete)

  // ACTUALIZAMOS SOLO UNA PARTE DE LA PELICULA
  router.patch('/:id', movieController.update)
}
