import { ServerResponse } from "node:http";
import { AuthenticatedRequest } from "./authentication";
import { type User, Role } from "../models/user";

/**
 * Helper function to send standardized error responses.
 * 
 * @param {ServerResponse} res - The response object.
 * @param {number} statusCode - The HTTP status code.
 * @param {string} message - The error message to return.
 */
const sendError = (res: ServerResponse, statusCode: number, message: string): void => {
	res.statusCode = statusCode;
	res.end(JSON.stringify({ success: false, message }));
}


/**
 * Middleware factory function that authorizes the roles of the user.
 * 
 * This function returns a middleware that checks if the authenticated user has one of the allowed roles.
 * If the user does not have the correct role, it responds with a `403 Forbidden` status.
 *
 * @param {...RoleUser} roles - A list of roles that are authorized to access the resource.
 * @returns {Function} - A middleware that checks 
 * if the user has the required role. Returns `true` if authorized, or `false` if not authorized (responding with 
 * a 403 error).
 */
export const authorizeRoles = (...roles: Role[]): Function => {
	return async (req: AuthenticatedRequest, res: ServerResponse): Promise<boolean> => {
		const user = (req.user as User);
		if (!user || !user.role) {
			sendError(res, 403, "forbidden");
			return false;
		}

		if (!roles.includes(user.role)) {
			sendError(res, 403, "forbidden");
			return false;
		}
		return true;
	};
};
