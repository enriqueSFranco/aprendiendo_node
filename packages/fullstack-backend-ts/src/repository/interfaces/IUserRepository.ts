import { TUser } from "../../domain/user.types";

export interface IUserRepository {
  create(user: TUser): Promise<TUser>;
}
