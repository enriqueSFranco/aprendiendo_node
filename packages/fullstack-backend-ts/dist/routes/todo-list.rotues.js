"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoListRouter = createTodoListRouter;
const express_1 = require("express");
const todo_list_controller_1 = require("../controllers/todo-list.controller");
const router = (0, express_1.Router)();
function createTodoListRouter(service) {
    const todoController = new todo_list_controller_1.TodoController(service);
    router.get("/", todoController.getAll);
    router.post("/", todoController.create);
    router.patch("/:id", todoController.update);
    router.delete("/:id", todoController.delete);
}
