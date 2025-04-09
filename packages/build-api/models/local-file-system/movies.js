import { randomUUID } from 'node:crypto'
import { loadFile } from '../../utils/load-file.js'

class Movie {
  constructor(
    title,
    year,
    director,
    duration,
    poster,
    genre,
    rate
  ) {
    this.title = title
    this.year = year
    this.director = director
    this.duration = duration
    this.poster = poster
    this.genre = genre
    this.rate = rate
  }
}

const movies = loadFile('../mocks/movies.json')

export class MovieModel {
  static async getAllMovies ({ genre }) {
    if (!genre) {
      return movies
    }

    let filteredMovies = [...movies]

    if (genre) {
      filteredMovies = movies.filter(movie => {
        return movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      })
    }

    return filteredMovies
  }

  static async getMovieById ({ movieId }) {
    const movie = movies.find(movie => movie.id === movieId)
    return movie
  }

  static async createMovie ({ payload }) {
    console.log(payload)
    const newMovie = {
      id: randomUUID(),
      ...payload
    }
    movies.push(newMovie)
    return newMovie
  }

  static async deleteMovie ({ movieId }) {
    const movieIdx = movies.findIndex(movie => movie.id === movieId)

    if (movieIdx === -1) return false

    movies.splice(movieIdx, 1)

    return true
  }

  static async updateMovie ({ movieId, payload }) {
    const movieIdx = movies.findIndex(movie => movie.id === movieId)

    if (movieIdx === -1) return false

    movies[movieIdx] = {
      ...movies[movieIdx],
      ...payload
    }

    return movies[movieIdx]
  }
}