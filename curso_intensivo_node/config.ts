export const config = {
	jwtSecret: process.env.JWT_SECRET as string || "My_Secret_key",
	port: process.env.PORT as string || 4000
}

export default config