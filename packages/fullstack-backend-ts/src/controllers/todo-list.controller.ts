import { Request, Response } from "express";
import AppError from "../utils/errors/AppError";
import { ITodoService } from "../services/interfaces/ITodoService";
import { TCreateTodoItem } from "../domain/todo.types";

export class TodoController {
  constructor(private service: ITodoService) {
    this.service = service;
  }

  get = async (req: Request, res: Response) => {
    try {
      const data = await this.service.getAllTodos();
      res.status(200).json({ data });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      const error = new AppError(message, 500);
      res.json({ error });
    }
  };

  post = async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;
      if (!title.trim()) throw new AppError("Title is required", 400);

      const newTodoItem: TCreateTodoItem = {
        title,
        description,
      };
      // TODO:
      const userId = crypto.randomUUID();
      const data = await this.service.create(newTodoItem, userId);
      res.status(201).json({ data });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      const error = new AppError(message, 500);
      res.json({ error });
    }
  };

  patch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, complete } = req.body;
      const updated = await this.service.update(id, {
        title,
        description,
        complete,
      });
      if (!updated) throw new AppError("Todo not found", 404);

      res.status(200).json({ updated });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      const error = new AppError(message, 500);
      res.json({ error });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.service.delete(id);

      if (!deleted) throw new AppError("Todo not found", 404);

      res.status(202).json({ deleted });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      const error = new AppError(message, 500);
      res.json({ error });
    }
  };
}
