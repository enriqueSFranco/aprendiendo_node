export const config = {
	jwtSecret: process.env.JWT_SECRET as string || "My_Secret_key"
}

export default config