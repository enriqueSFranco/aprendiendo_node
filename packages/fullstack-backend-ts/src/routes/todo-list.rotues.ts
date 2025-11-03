import { Router } from "express";
import { TodoController } from "../controllers/todo-list.controller";
import { ITodoService } from "../services/interfaces/ITodoService";

const router = Router();

export function createTodoListRouter(service: ITodoService) {
  const todoController = new TodoController(service);

  router.get("/", todoController.getAll);
  router.post("/", todoController.create);
  router.patch("/:id", todoController.update);
  router.delete("/:id", todoController.delete);
}
