import { MySqlConnection, OracleConnection, PostgreSqlConnection } from "../connections/index.js"

export class DatabaseConnection {
  static createDatabaseConnection (type) {
    if (type === 'oracle') {
      return new OracleConnection()
    }
    else if (type === 'mysql') {
      return new MySqlConnection()
    }
    else if (type === 'postgresql') {
      return new PostgreSqlConnection()
    }
    else throw new Error('Tipo de base de datos no soportado')
  }
}
