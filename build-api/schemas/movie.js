const z = require('zod')

const MovieSchema = z.object({
  title: z.string({ invalid_type_error: '' }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({ message: 'Poster must be a valid URL' }).endsWith('.jpg'),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      invalid_type_error: 'Movie genre is required.',
      required_error: 'Movie genre must be an array of enum Genre'
    }
  ),
  rate: z.number().positive().min(0).max(10).default(0)
})

function validateMovie (object) {
  return MovieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return MovieSchema.partial().safeParse(object)
}

module.exports = { validateMovie, validatePartialMovie }
