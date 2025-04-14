import {
  TCreateTodoItem,
  TTodoItem,
  TUpdateTodoItem,
} from "../../domain/todo.types";

export interface ITodoRepository {
  create(data: TCreateTodoItem): Promise<TTodoItem>;
  findAll(): Promise<TTodoItem[]>;
  findById(id: string): Promise<TTodoItem>;
  update(id: string, data: TUpdateTodoItem): Promise<TTodoItem>;
  delete(id: string): Promise<TTodoItem>;
  countPendingByUser(userId: string): Promise<number>;
}
