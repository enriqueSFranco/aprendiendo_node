"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const AppError_1 = __importDefault(require("../utils/errors/AppError"));
class TodoController {
    service;
    constructor(service) {
        this.service = service;
        this.service = service;
    }
    getAll = async (_, res) => {
        try {
            const data = await this.service.getAllTodos();
            res.status(200).json({ data });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            const error = new AppError_1.default(message, 500);
            res.json({ error });
        }
    };
    getOne = async () => { };
    create = async (req, res) => {
        try {
            const { title, description, userId } = req.body;
            if (!title.trim())
                throw new AppError_1.default("Title is required", 400);
            const newTodoItem = {
                title,
                description,
                userId,
            };
            // TODO:
            const data = await this.service.createTodo(newTodoItem, userId);
            res.status(201).json({ data });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            const error = new AppError_1.default(message, 500);
            res.json({ error });
        }
    };
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, complete } = req.body;
            const updated = await this.service.updateTodo(id, {
                title,
                description,
                complete,
            });
            if (!updated)
                throw new AppError_1.default("Todo not found", 404);
            res.status(200).json({ updated });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            const error = new AppError_1.default(message, 500);
            res.json({ error });
        }
    };
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await this.service.deleteTodo(id);
            if (!deleted)
                throw new AppError_1.default("Todo not found", 404);
            res.status(202).json({ deleted });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            const error = new AppError_1.default(message, 500);
            res.json({ error });
        }
    };
}
exports.TodoController = TodoController;
