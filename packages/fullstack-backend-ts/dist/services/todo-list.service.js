"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const AppError_1 = __importDefault(require("../utils/errors/AppError"));
// 🧠 Service (servicio)
// Responsabilidad: Lógica de negocio.
// Hace cosas como:
// Aplicar reglas del negocio.
// Usar uno o más repositorios para cumplir con una tarea.
// Validaciones, transformaciones, etc.
class TodoService {
    repository;
    constructor(repository) {
        this.repository = repository;
        this.repository = repository;
    }
    async create(data, userId) {
        try {
            const counter = await this.repository.countPendingByUser(userId);
            if (counter >= 5)
                throw new AppError_1.default("You can't have more than 5 pending tasks.", 400);
            if (!data.title)
                throw new AppError_1.default("Title is required", 400);
            const todo = await this.repository.create(data);
            return todo;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            const error = new AppError_1.default(message, 500);
            throw error;
        }
    }
    async findAll() {
        try {
            return await this.repository.findAll();
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            const error = new AppError_1.default(message, 500);
            throw error;
        }
    }
    async findById(id) {
        try {
            return await this.repository.findById(id);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            const error = new AppError_1.default(message, 500);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const existing = await this.repository.update(id, data);
            if (!existing)
                throw new AppError_1.default("Todo not found", 404);
            const updated = await this.repository.update(id, data);
            if (!updated)
                throw new AppError_1.default("Update failed", 500);
            return updated;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            const error = new AppError_1.default(message, 500);
            throw error;
        }
    }
    async delete(id) {
        try {
            const success = await this.repository.delete(id);
            if (!success)
                throw new AppError_1.default("Todo not found", 404);
            return success;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            const error = new AppError_1.default(message, 500);
            throw error;
        }
    }
}
exports.TodoService = TodoService;
