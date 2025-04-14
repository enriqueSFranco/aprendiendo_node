"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoListRouter = createTodoListRouter;
const express_1 = require("express");
const todo_list_controller_1 = require("../controllers/todo-list.controller");
const router = (0, express_1.Router)();
function createTodoListRouter(service) {
    const todoController = new todo_list_controller_1.TodoController(service);
    router.get("/", todoController.get);
    router.post("/", todoController.post);
    router.patch("/:id", todoController.patch);
    router.delete("/:id", todoController.delete);
}
