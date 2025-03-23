import { hash } from "bcrypt"
import { z } from "zod"

enum RoleUser {
	USER = 1,
	ADMIN = 2
}

const emailSchema = z.string().email()
const passwordSchema = z.string().min(6)

const AuthSchema = z.object({
	email: emailSchema,
	password: passwordSchema
})

// extract the inferred type
type User = z.infer<typeof AuthSchema> & {
	id: number
	role: RoleUser.ADMIN | RoleUser.USER,
	refreshToken?: string
}

const users: Map<string, User> = new Map()

/**
 * creates a new user with the given email and passoword
 * @param {stirng} email - the email of the user
 * @param {string} password - the password of the user
 * @returns {Promise<User>} - the created user 
 * 
*/
export const createUser = async (email: string, password: string): Promise<User> => {
	const hashedPassword = await hash(password, 10)
	const newUser: User = {
		id: Date.now(),
		role: RoleUser.USER,
		email,
		password: hashedPassword,
	}
	users.set(email, newUser)
	return newUser
}

/**
 * finds a user by their give email
 * @param {string} email - the email of the user to find
 * @returns {User | undefined} the user if found, otherwise undefined 
*/
export const findUserByEmail = (email: string): User | undefined => users.get(email)