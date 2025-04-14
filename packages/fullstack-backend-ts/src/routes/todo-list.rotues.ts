import { Router } from "express";
import { TodoController } from "../controllers/todo-list.controller";
import { ITodoService } from "../services/interfaces/ITodoService";

const router = Router();

export function createTodoListRouter(service: ITodoService) {
  const todoController = new TodoController(service);

  router.get("/", todoController.get);
  router.post("/", todoController.post);
  router.patch("/:id", todoController.patch);
  router.delete("/:id", todoController.delete);
}
