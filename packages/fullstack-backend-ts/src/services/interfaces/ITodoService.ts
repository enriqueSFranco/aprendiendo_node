import {
  TCreateTodoItem,
  TTodoItem,
  TUpdateTodoItem,
} from "../../domain/todo.types";

export interface ITodoService {
  create(data: TCreateTodoItem, userId: string): Promise<TCreateTodoItem>;
  getAllTodos(): Promise<TTodoItem[]>;
  findById(id: string): Promise<TTodoItem>;
  update(id: string, data: TUpdateTodoItem): Promise<TTodoItem>;
  delete(id: string): Promise<TTodoItem>;
}
