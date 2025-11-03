import { TUser } from "../domain/user.types";
import { IUserRepository } from "../repository/interfaces/IUserRepository";
import winstonLoggerAdapter from "../adapters/logger/WinstonLoggerAdapter";

interface IUserService {
  craeteUser(data: TUser): Promise<TUser>;
}

export class UserService implements IUserService {
  constructor(private readonly repository: IUserRepository) {}

  craeteUser = async (data: TUser): Promise<TUser> => {
    try {
      const user = await this.repository.create(data);
      return user;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      winstonLoggerAdapter.error(`${this}: createUser`, {
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
  };
}
