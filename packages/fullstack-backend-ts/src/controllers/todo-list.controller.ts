import { Request, Response } from "express";
import AppError from "../utils/errors/AppError";
import { ITodoService } from "../services/interfaces/ITodoService";
import { TTodoItem } from "../domain/todo.types";
import { ITodoController } from "./interfaces/ITodoController";

export class TodoController implements ITodoController {
  constructor(private service: ITodoService) {
    this.service = service;
  }

  getAll = async (_: Request, res: Response) => {
    try {
      const data = await this.service.getAllTodos();
      res.status(200).json({ data });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      const error = new AppError(message, 500);
      res.json({ error });
    }
  };

  getOne = async () => {};

  create = async (req: Request, res: Response) => {
    try {
      const { title, description, userId } = req.body;
      if (!title.trim()) throw new AppError("Title is required", 400);

      const newTodoItem: TTodoItem = {
        title,
        description,
        userId,
      };
      // TODO:
      const data = await this.service.createTodo(newTodoItem, userId);
      res.status(201).json({ data });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      const error = new AppError(message, 500);
      res.json({ error });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, complete } = req.body;
      const updated = await this.service.updateTodo(id, {
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
      const deleted = await this.service.deleteTodo(id);

      if (!deleted) throw new AppError("Todo not found", 404);

      res.status(202).json({ deleted });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      const error = new AppError(message, 500);
      res.json({ error });
    }
  };
}
