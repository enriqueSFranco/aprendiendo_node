import { IncomingMessage, ServerResponse } from "node:http";
import { AuthenticatedRequest, authenticateToken } from "../middleware/authentication";
import { HttpMethod } from "../models/api";
import { addCharacter, Character, CharacterSchema, getAllCharacters, getCharacterById } from "../models/character";
import { parseBody } from "../utils/parse";
import { authorizeRoles } from "../middleware/authorization";
import { Role } from "../models/user";

export const characterRouter = async (req: IncomingMessage, res: ServerResponse) => {
	const { url, method } = req

	if (await authenticateToken(req as AuthenticatedRequest, res)) {
		res.statusCode = 401
		res.end(JSON.stringify({ success: false, message: "Unauthorized" }))
		return
	}

	if (url === "/characters" && method === HttpMethod.GET) {
		const characters = getAllCharacters()
		res.statusCode = 200
		res.end(JSON.stringify({ success: true, characters }))
		return
	}

	if (url === "/characters/" && method === HttpMethod.GET) {
		const id = parseInt(url.split("/").pop() as string, 10)
		const character = getCharacterById(id)

		if (!character) {
			res.statusCode = 404
			res.end(JSON.stringify({ success: false, message: `Character with id=${id} Not Found` }))
		}
		res.statusCode = 200
		res.end(JSON.stringify({ success: true, message: character }))
		return
	}

	if (url === "/characters" && method === HttpMethod.POST) {
		if (!authorizeRoles(Role.ADMIN, Role.USER)(req as AuthenticatedRequest, res)) {
			res.statusCode = 403
			res.end(JSON.stringify({ success: false, message: "Forbidden" }))
			return
		}

		const body = await parseBody(req)
		const result = CharacterSchema.safeParse(body)

		if (result.error) {
			res.statusCode = 400
			res.end(JSON.stringify({ success: false, message: result.error }))
			return
		}
		const character: Character = body
		const newCharacter = addCharacter(character)
		res.end(JSON.stringify({ success: result.success, newCharacter }))
		return
	}
}
