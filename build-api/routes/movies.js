import { Router } from "express"; // <- crea un enrutador para la app
// import { loadFile } from "../utils/load-file";
import { MovieController } from '../controllers/movies.js';

const router = Router()
// filter = {year, genre, rate}
// const movies = loadFile('../mocks/movies.json')
router.get('/', MovieController.getAll)
router.get('/:id', MovieController.getById)

router.post('/', MovieController.create)
router.delete('/:id', MovieController.delete)

// ACTUALIZAMOS SOLO UNA PARTE DE LA PELICULA
router.patch('/:id', MovieController.update)

export default router