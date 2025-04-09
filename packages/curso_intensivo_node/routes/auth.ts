import { IncomingMessage, ServerResponse } from "node:http";
import { HttpMethod } from "../models/api";
import { parseBody } from "../utils/parse";
import { AuthSchema, createUser, findUserByEmail, revokeUserToke, validatePassword } from "../models/user";
import { sign } from "jsonwebtoken";
import config from "../config";
import { addRevokeToken } from "../models/revokeToken";
import { AuthenticatedRequest } from "../middleware/authentication";

export const authRouter = async (req: IncomingMessage, res: ServerResponse) => {
	const { url, method } = req

	if (url === "/auth/register" && method === HttpMethod.POST) {
		const body = await parseBody(req)
		// verificamos si el body cumple con la estructura de AuthSchema
		const result = AuthSchema.safeParse(body)

		if (result.error) {
			res.end(JSON.stringify({ success: false, message: "Bad Request" }))
			return
		}
		const { email, password } = body
		try {
			const user = await createUser(email, password)
			res.statusCode = 201
			res.end(JSON.stringify(user))
		} catch (error) {
			if (error instanceof Error)
				res.end(JSON.stringify({ success: false, message: error.message }))
			else
				res.end(JSON.stringify({ success: false, message: "Internal Server Error" }))
		}
	}

	if (url === "/auth/login" && method === HttpMethod.POST) {
		const body = await parseBody(req)
		const result = AuthSchema.safeParse(body)

		if (result.error) {
			res.end(JSON.stringify({ success: false, message: "Bad Request" }))
			return
		}
		const { email, passoword } = body
		const user = findUserByEmail(email)

		if (!user || !(await validatePassword(user, passoword))) {
			res.statusCode = 401
			res.end(JSON.stringify({ success: false, message: "Invalid email or password" }))
			return
		}
		const accessToken = sign(
			{ id: user.id, email: user.email, password: user.password, role: user.role },
			config.jwtSecret,
			{ expiresIn: "1h" }
		)
		const refreshToken = sign(
			{ id: user.id },
			config.jwtSecret,
			{ expiresIn: "1d" }
		)
		user.refreshToken = refreshToken
		res.end(JSON.stringify({ accessToken, refreshToken }))
		return
	}

	if (url === "/auth/logout" && method === HttpMethod.POST) {
		const token = req.headers["authorization"]?.split(" ")[1]

		if (token) {
			addRevokeToken(token)

			const formattedReq = req as AuthenticatedRequest
			if (formattedReq.user && typeof formattedReq.user === "object" && "id" in formattedReq.user) {
				const result = revokeUserToke(formattedReq.user.email)

				if (!result) {
					res.statusCode = 403
					res.end(JSON.stringify({ success: false, message: "Forbidden" }))
				}
			}

		}
		JSON.stringify({ success: true, message: "logged out" })
		return
	}
	res.statusCode = 404
	res.end(JSON.stringify({ message: "Enpoint Not Found" }))
}