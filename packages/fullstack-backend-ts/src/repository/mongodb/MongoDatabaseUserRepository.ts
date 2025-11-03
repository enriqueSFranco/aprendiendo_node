import { IUserRepository } from "../interfaces/IUserRepository";
import { TUser, TUpdateUser } from "../../domain/user.types";
import UserModel from "../../schemas/user.schema";
import AppError from "../../utils/errors/AppError";
import winstonLoggerAdapter from "../../adapters/logger/WinstonLoggerAdapter";

class MongoDatabaseUserRepository implements IUserRepository {
  create = async (user: TUser): Promise<TUser> => {
    try {
      if (!user.email.trim() || !user.password.trim() || !user.username.trim())
        throw new AppError("username and email and password are required", 400);

      const row = new UserModel(user);
      const savedUser = await row.save();
      return {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
        password: savedUser.password,
        active: savedUser.active,
      };
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      winstonLoggerAdapter.debug(`[${this}:create] Failed to create user`, {
        message: error.message,
        stack: error.stack,
      });
      throw err;
    }
  };
  findAll = async () => {
    try {
      const users = await UserModel.find().lean();
      return users;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      winstonLoggerAdapter.error(`[${this}:findAll] Failed to retrieve users`, {
        message: error.message,
        stack: error.stack,
      });
      throw new AppError("Failed to retrieve todo items", 500);
    }
  };
  findById = async (_id: string) => {
    try {
      const user = await UserModel.findById(_id).lean();
      if (!user) throw new AppError(`User with id "${_id}" not found`, 404);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unkown error");
      winstonLoggerAdapter.error(`[${this}:findById] Failed to retrieve user`, {
        message: error.message,
        stack: error.stack,
      });
    }
  };
  update = async (_id: string, data: TUpdateUser) => {
    const updateData: TUpdateUser = {};
    if (data.username) updateData.username = data.username.trim();
    if (data.email) updateData.email = data.email.trim();
    if (data.password) updateData.password = data.password.trim();

    try {
      const user = await UserModel.findByIdAndUpdate(
        { _id },
        {
          $set: updateData,
        },
        { new: true, runValidators: true }
      );
      return user;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      winstonLoggerAdapter.error(`[${this}:update] Failed to update user`, {
        message: error.message,
        stack: error.stack,
      });
    }
  };
  delete = async (_id: string) => {
    try {
      if (!_id || !_id.trim()) {
        throw new AppError("User ID is required", 400);
      }
      const deletedDoc = await UserModel.findByIdAndDelete(_id).exec()

      if (!deletedDoc) {
        throw new AppError(`User with id '${_id}' not found`, 404);
      }
      return {
      id: deletedDoc.id.toString(),
      username: deletedDoc.username!,
      email: deletedDoc.email!,
      password: deletedDoc.password!,
      active: deletedDoc.active!,
    };
    } catch(err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      winstonLoggerAdapter.error(
        "[UserRepository:delete] Failed to delete user",
        {
          id: _id,
          message: error.message,
          stack: error.stack,
        }
      );
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Failed to delete the user. Please try again later.",
        500
      );
    }
  };
}

const mongoDatabaseUserRepository = new MongoDatabaseUserRepository();
export default mongoDatabaseUserRepository;
