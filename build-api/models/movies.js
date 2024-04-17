import { randomUUID } from 'node:crypto'
import loadFile from '../utils/load-file.js'

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

export class MovieModel {

  constructor() {
    this.movies = loadFile('./mocks/movies.json')
  }
  static async getAllMovies ({ filters } = {}) {

    if (!filters || Object.keys(filters).length === 0) {
      return this.movies
    }

    let filteredMovies = [...this.movies]

    if (filters.year) {
      filteredMovies = this.movies.filter(movie => movie.year === filters.year)
    }

    if (filters.genre) {
      filteredMovies = this.movies.filter(movie => {
        return movie.genre.some(g => g.toLowerCase() === filters.genre.toLowerCase())
      })
    }

    return filteredMovies
  }

  static async getMovieById ({ movieId }) {
    const movie = this.movies.find(movie => movie.id === movieId)
    return movie
  }

  static async createMovie ({ payload }) {
    const newMovie = {
      id: randomUUID(),
      ...object
    }
    this.movies.push(newMovie)
  }

  static async deleteMovie ({ movieId }) {
    const movieIdx = this.movies.findIndex(movie => movie.id === movieId)

    if (movieIdx === -1) return false

    this.movies.splice(movieIdx, 1)

    return true
  }

  static async updateMovie ({ movieId, payload }) {
    const movieIdx = this.movies.findIndex(movie => movie.id === movieId)

    if (movieIdx === -1) return false

    let movie = this.movies[movieIdx]
    const updatedMovie = {
      ...movie,
      ...payload
    }

    return updatedMovie
  }
}