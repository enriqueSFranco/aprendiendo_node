import { verify, type JwtPayload } from "jsonwebtoken";
import { IncomingMessage, ServerResponse } from "node:http";
import { isTokenRevoked } from "../models/revokeToken";
import config from "../config";

export interface AuthenticatedRequest extends IncomingMessage {
	user?: JwtPayload | string
}

export const authenticateToken = async (req: AuthenticatedRequest, res: ServerResponse) => {
	const authHeader = req.headers["authorization"] // <-- recuperamos el token de la cabecera authorization

	if (!authHeader) {
		return res.end(JSON.stringify({ success: false, message: "Authorization header missing." }))
	}

	// si existe authHeader "authorization": `Barear <token>` --> [Bearer, token]
	const token = authHeader && authHeader.split(" ")[1] // recupereamos el token

	// que pasa si no hay token
	if (!token) {
		res.statusCode = 404
		res.end(JSON.stringify({ success: false, message: "Unauthorized" }))
		return false
	}

	// el token ya expiro
	if (isTokenRevoked(token)) {
		res.statusCode = 403
		res.end(JSON.stringify({ success: false, message: "Forbidden" }))
		return false
	}

	// verificamos el token
	try {
		const decode = verify(token, config.jwtSecret)
		req.user = decode
		return true
	} catch (_error) {
		res.statusCode = 403
		res.end(JSON.stringify({ success: false, message: "Forbidden" }))
	}
}
