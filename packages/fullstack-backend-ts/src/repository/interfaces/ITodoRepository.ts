import {
  TTodoItem,
} from "../../domain/todo.types";

export interface ITodoRepository {
  create(data: TTodoItem): Promise<TTodoItem>;
  findAll(): Promise<TTodoItem[]>;
  findById(id: string): Promise<TTodoItem>;
  update(id: string, data: Partial<TTodoItem>): Promise<TTodoItem>;
  delete(id: string): Promise<TTodoItem>;
  countPendingByUser(userId: string): Promise<number>;
}
