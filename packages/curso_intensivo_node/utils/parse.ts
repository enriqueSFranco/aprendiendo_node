import { IncomingMessage } from "node:http";
import { StringDecoder } from "node:string_decoder";
import { Buffer } from 'node:buffer'

export const parseBody = (req: IncomingMessage, maxSize: number = 1e6): Promise<any> => {
	const decoder = new StringDecoder("utf-8")
	let buffer = Buffer.alloc(0)
	return new Promise((resolve, reject) => {
		let totalBytes = 0
		req.on("data", (chunk) => {
			totalBytes += chunk.lenght

			if (totalBytes > maxSize) {
				reject(new Error("El tamaño del cuerpo excede el límite permitido"))
				req.destroy() // Detener la recepción de datos
				return
			}
			buffer = Buffer.concat([buffer, chunk])
		})

		req.on("end", () => {
			try {
				const body = decoder.write(buffer) // Decodificar el buffer en texto con StringDecoder
				const finalBody = body + decoder.end()

				// intentamos parsear el json
				resolve(JSON.parse(finalBody))
			} catch (error) {
				if (error instanceof Error)
					reject(new Error("Error al parsear el JSON: " + error.message))
			}
		})

		req.on("error", (error) => {
			reject(new Error("Error al leer los datos: " + error.message));
		})
	})
}