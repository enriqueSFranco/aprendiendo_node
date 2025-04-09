import { DatabaseConnection } from "../../database/factories/DatabaseConnection.js"

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
const config = {
  host: '',
  port: '',
  database: '',
  user: ''
}
const mySqlConnection = DatabaseConnection.createDatabaseConnection('mysql')
const connection = mySqlConnection.connect('mysql')

export class MovieModel {

  static async getAllMovies ({ genre }) {
    if (genre) {
      // code ...
    }
    const query = 'SELECT BIN_TO_UUID(id) movie_id, title, year, director, duration, poster, genre, rate FROM Movies'
    const [results] = await connection
      .query(query)

    return results
  }

  static async getMovieById ({ movieId }) {

  }

  static async createMovie ({ payload }) {
    const {
      title,
      year,
      duration,
      director,
      poster,
      genre,
      rate
    } = payload

    const uuidResult = await connection.query('SELECT UUID() uuid')
    const [{ uuid }] = uuidResult

    const query = 'INSERT INTO Movies (id, title, year, duration, director, poster, genre, rate) VALUES(UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?, ?);'
    const result = await connection.query(query, [uuid, title, year, duration, director, poster, genre, rate])

    return result
  }

  static async deleteMovie ({ movieId }) {

  }

  static async updateMovie ({ movieId, payload }) {

  }
}