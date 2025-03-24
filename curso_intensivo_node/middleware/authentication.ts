import { verify, type JwtPayload } from "jsonwebtoken";
import { IncomingMessage, ServerResponse } from "node:http";
import { isTokenRevoked } from "../models/revokeToken";
import config from "../config";

/**
 * Interface que extiende `IncomingMessage` y agrega la propiedad `user` 
 * que puede ser un objeto `JwtPayload` o un string.
 */
export interface AuthenticatedRequest extends IncomingMessage {
	user?: JwtPayload | string;
}

/**
 * Middleware para autenticar el token de la cabecera Authorization.
 * 
 * Este middleware valida el token JWT enviado en la cabecera `Authorization`. Si el token es válido y no está revocado, 
 * se decodifica y se adjunta a la propiedad `user` del objeto `req`. Si el token es inválido o revocado, responde 
 * con un error adecuado.
 *
 * @param {AuthenticatedRequest} req - Objeto de solicitud que extiende `IncomingMessage` y contiene el token JWT.
 * @param {ServerResponse} res - Objeto de respuesta de servidor para enviar la respuesta de error si es necesario.
 * @returns {boolean | void} - Devuelve `true` si el token es válido y ha sido decodificado correctamente, 
 * o `false` si ocurre algún error en el proceso de autenticación.
 */
export const authenticateToken = async (req: AuthenticatedRequest, res: ServerResponse): Promise<boolean | void> => {
	const authHeader = req.headers["authorization"]; // Recuperamos el token de la cabecera "Authorization"

	if (!authHeader) {
		res.end(JSON.stringify({ success: false, message: "Authorization header missing." }));
		return false
	}

	// Si existe authHeader con formato "Authorization: Bearer <token>", separamos el token
	const token = authHeader && authHeader.split(" ")[1];

	// Si no hay token, respondemos con un error 404
	if (!token) {
		res.statusCode = 404;
		res.end(JSON.stringify({ success: false, message: "Unauthorized" }));
		return false;
	}

	// Verificamos si el token ha sido revocado
	if (isTokenRevoked(token)) {
		res.statusCode = 403;
		res.end(JSON.stringify({ success: false, message: "Forbidden" }));
		return false;
	}

	// Verificamos y decodificamos el token
	try {
		const decode = verify(token, config.jwtSecret);
		req.user = decode; // Guardamos la información decodificada en la propiedad "user" de la solicitud
		return true;
	} catch (_error) {
		res.statusCode = 403;
		res.end(JSON.stringify({ success: false, message: "Forbidden" }));
	}
};


// forma elegante de quitar propiedades a un objeto
//const {password: _, ...publicUser} = user