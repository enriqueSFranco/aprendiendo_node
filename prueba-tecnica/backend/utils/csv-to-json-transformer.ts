import CSV from 'convert-csv-to-json'
import { MulterError } from 'multer'

export function CSVToJSONTransformer (file: Express.Multer.File) {
  let json: Array<Record<string, string>> = []
  try {
    const csvContent = Buffer.from(file.buffer).toString('utf-8')
    json = CSV.fieldDelimiter(',').csvStringToJson(csvContent)
    return json
  } catch (error) {
    if (error instanceof MulterError) {
      throw new Error(`status: ${error.code}, Error: ${error.message}`)
    } else if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`)
    }
    throw new Error(`Error Unknown`)
  }
}