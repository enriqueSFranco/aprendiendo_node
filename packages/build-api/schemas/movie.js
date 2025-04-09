import { object as _object, string, number, array, enum as _enum } from 'zod'

const MovieSchema = _object({
  title: string({ invalid_type_error: '' }),
  year: number().int().min(1900).max(2025),
  director: string(),
  duration: number().int().positive(),
  poster: string().url({ message: 'Poster must be a valid URL' }).endsWith('.jpg'),
  genre: array(
    _enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      invalid_type_error: 'Movie genre is required.',
      required_error: 'Movie genre must be an array of enum Genre'
    }
  ),
  rate: number().positive().min(0).max(10).default(0)
})

function validateMovie (object) {
  return MovieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return MovieSchema.partial().safeParse(object)
}

export { validateMovie, validatePartialMovie }
