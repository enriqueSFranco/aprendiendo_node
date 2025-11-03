// import { TUser } from "../domain/user.types";
// import AppError from "../utils/errors/AppError";

// class UserController {
//   constructor(private readonly service) {}

//   post = async (req: Request, res: Response) => {
//     try {
//       const { username, email, password } = req.body;
//       if (!username.trim()) throw new AppError("Title is required", 400);

//       const user: TUser = {
//         username,
//         email,
//         password,
//         active: false,
//         verified: false,
//       };
//       const data = await this.service.create(user);
//       res.status(200).json({ data });
//     } catch (err) {
//       const message = err instanceof Error ? err.message : "Unknown error";
//       const error = new AppError(message, 500);
//       res.json({ error });
//     }
//   };
// }
