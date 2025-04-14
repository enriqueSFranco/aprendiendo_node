import {
  TTodoItem,
  TCreateTodoItem,
  TUpdateTodoItem,
} from "../domain/todo.types";
import { ITodoRepository } from "../repository/interfaces/ITodoRepository";
import AppError from "../utils/errors/AppError";

// 🧠 Service (servicio)
// Responsabilidad: Lógica de negocio.
// Hace cosas como:
// Aplicar reglas del negocio.
// Usar uno o más repositorios para cumplir con una tarea.
// Validaciones, transformaciones, etc.

export class TodoService {
  constructor(private readonly repository: ITodoRepository) {
    this.repository = repository;
  }
  async create(
    data: TCreateTodoItem,
    userId: string,
  ): Promise<TCreateTodoItem> {
    try {
      const counter = await this.repository.countPendingByUser(userId);
      if (counter >= 5)
        throw new AppError("You can't have more than 5 pending tasks.", 400);

      if (!data.title) throw new AppError("Title is required", 400);

      const todo = await this.repository.create(data);
      return todo;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      const error = new AppError(message, 500);
      throw error;
    }
  }

  async findAll(): Promise<TTodoItem[]> {
    try {
      return await this.repository.findAll();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      const error = new AppError(message, 500);
      throw error;
    }
  }
  async findById(id: string): Promise<TTodoItem> {
    try {
      return await this.repository.findById(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      const error = new AppError(message, 500);
      throw error;
    }
  }
  async update(id: string, data: TUpdateTodoItem): Promise<TTodoItem> {
    try {
      const existing = await this.repository.update(id, data);
      if (!existing) throw new AppError("Todo not found", 404);
      const updated = await this.repository.update(id, data);
      if (!updated) throw new AppError("Update failed", 500);
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      const error = new AppError(message, 500);
      throw error;
    }
  }
  async delete(id: string): Promise<TTodoItem> {
    try {
      const success = await this.repository.delete(id);
      if (!success) throw new AppError("Todo not found", 404);
      return success;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      const error = new AppError(message, 500);
      throw error;
    }
  }
}
