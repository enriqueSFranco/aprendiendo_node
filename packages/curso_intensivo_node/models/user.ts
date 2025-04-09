import { compare, hash } from "bcrypt"
import { z } from "zod"

export enum Role {
	USER = 1,
	ADMIN = 2
}

const emailSchema = z.string().email()
const passwordSchema = z.string().min(6)

export const AuthSchema = z.object({
	email: emailSchema,
	password: passwordSchema
})

// extract the infered type
export type User = Zod.infer<typeof AuthSchema> & {
	id: number,
	role: Role.ADMIN | Role.USER,
	refreshToken?: string
}

const users: Map<string, User> = new Map()

/**
 * creates a new user with the given email and passoword
 * @param {stirng} email - the email of the user
 * @param {string} password - the password of the user
 * @return {Promise<User>} - the created user 
 * 
*/
export const createUser = async (email: string, password: string): Promise<User> => {
	const hashedPassword = await hash(password, 10)
	const newUser: User = {
		id: Date.now(),
		role: Role.USER,
		email,
		password: hashedPassword,
	}
	users.set(email, newUser)
	return newUser
}

/**
 * finds a user by their give email
 * @param {string} email - the email of the user to find
 * @return {User | undefined} the user if found, otherwise undefined 
*/
export const findUserByEmail = (email: string): User | undefined => users.get(email)

/**
 * validates a user's password
 * @param {User} user - the user whose password to validate
 * @param {string} passoword - the password to validate
 * @returns {Promise<boolean>} - true if the password is valid, otherwise false
*/
export const validatePassword = async (user: User, password: string): Promise<boolean> => {
	return compare(password, user.password)
}

/**
 * revoke token
 * @param {string} email - the email of the user to revoke the token
 * @return {boolean} - true if the token is revoked, otherwise false
*/
export const revokeUserToke = (email: string): boolean => {
	const foundUser = findUserByEmail(email)

	if (!foundUser) {
		return false
	}
	users.set(email, { ...foundUser, refreshToken: undefined }) // le borramos el token al usuario
	return true
}