import mysql from 'mysql2/promise'
import { DatabaseConnection } from './DatabaseConnection'

export class MySqlConnection extends DatabaseConnection {
  async connect ({ host, port, database, user }) {
    return await mysql.createConnection({ host, user, database, port })
  }
}