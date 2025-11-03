import {
  // TCreateTodoItem,
  TTodoItem,
  // TUpdateTodoItem,
} from "../../domain/todo.types";

export interface ITodoService {
  createTodo(data: TTodoItem, userId: string): Promise<TTodoItem>;
  getAllTodos(): Promise<TTodoItem[]>;
  getTodo(id: string): Promise<TTodoItem>;
  updateTodo(id: string, data: Partial<TTodoItem>): Promise<TTodoItem>;
  deleteTodo(id: string): Promise<TTodoItem>;
}
