"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_schema_1 = __importDefault(require("../../schemas/todo.schema"));
const AppError_1 = __importDefault(require("../../utils/errors/AppError"));
const WinstonLoggerAdapter_1 = __importDefault(require("../../adapters/logger/WinstonLoggerAdapter"));
// 📦 Repository (repositorio)
// Responsabilidad: Acceso a datos (DB, API, archivos, etc.)
// Hace cosas como:
// Guardar, buscar, actualizar, eliminar datos.
// Abstrae la lógica de base de datos.
// No sabe nada del "negocio", solo de datos.
/**
 * MongoDB implementation of the ITodoRepository interface.
 * Encapsulates all the CRUD operations for Todo items using Mongoose models.
 */
class MongoDBTodoRepository {
    // constructor(model) {}
    /**
     * Creates a new Todo item in the database.
     *
     * @param {TTodoItem} data - Object containing title and description of the todo item.
     * @returns {Promise<TTodoItem>} The created Todo item.
     * @throws {AppError} If title or description is missing or creation fails.
     */
    async create(data) {
        const { title, description } = data;
        if (!title?.trim() || !description?.trim()) {
            new AppError_1.default("Title and description are required", 400);
        }
        try {
            const doc = new todo_schema_1.default({
                title,
                description,
            });
            const savedTodoItem = await doc.save();
            // sanitizar / transformar si es necesario antes de retornar
            return {
                id: savedTodoItem.id,
                title: savedTodoItem.title,
                description: savedTodoItem.description,
                complete: savedTodoItem.complete,
                archived: savedTodoItem.archived,
                userId: savedTodoItem.userId.toString()
            };
        }
        catch (err) {
            // Error handling pendiente
            const error = err instanceof Error ? err : new Error("Unknown error");
            // Logging interno para monitoreo o debugging
            WinstonLoggerAdapter_1.default.error("[createTodoItem] Failed to create todo item:", {
                message: error.message,
                stack: error.stack,
                context: { title, description },
            });
            // Podrías lanzar un error más específico si usas una capa de error handling
            throw new AppError_1.default("Could not create the todo item. Please try again later.", 500);
        }
    }
    /**
     * Retrieves all non-archived Todo items from the database.
     *
     * @returns {Promise<TTodoItem[]>} An array of todo items.
     * @throws {AppError} If retrieval fails.
     */
    async findAll() {
        try {
            const todos = await todo_schema_1.default.find({ archived: false })
                .lean()
                .populate("user");
            const flattenTodos = todos.map(todo => ({
                id: todo.id,
                title: todo.title,
                description: todo.description,
                complete: todo.complete,
                archived: todo.archived,
                userId: todo.userId.toString(),
            }));
            return flattenTodos;
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Unknown error");
            WinstonLoggerAdapter_1.default.error("[TodoService:getAllTodoItems] Failed to retrieve items", {
                message: error.message,
                stack: error.stack,
            });
            throw new AppError_1.default("Failed to retrieve todo items", 500);
        }
    }
    /**
     * Retrieves a specific Todo item by its ID.
     *
     * @param {string} _id - The ID of the Todo item to retrieve.
     * @returns {Promise<TTodoItem>} The found Todo item.
     * @throws {AppError} If the item is not found or retrieval fails.
     */
    async findById(_id) {
        try {
            const todo = await todo_schema_1.default.findById(_id).lean();
            if (!todo)
                throw new AppError_1.default(`Todo item with id "${_id}" not found`, 404);
            return {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                complete: todo.complete,
                archived: todo.archived,
                userId: todo.userId.toString(),
            };
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Unknown error");
            WinstonLoggerAdapter_1.default.error("[TodoService:getTodoItemById] Failed to retrieve item", {
                message: error.message,
                stack: error.stack,
                _id,
            });
            throw new AppError_1.default("Failed to retrieve todo item", 500);
        }
    }
    /**
     * Updates an existing Todo item by ID.
     *
     * @param {string} _id - The ID of the Todo item to update.
     * @param {TTodoItem} data - Fields to update (title, description, complete).
     * @returns {Promise<TTodoItem>} The updated Todo item.
     * @throws {AppError} If update data is invalid, item is not found, or update fails.
     */
    async update(_id, data) {
        if (!data.title && !data.description && !data.complete) {
            throw new AppError_1.default("At least one field (title or description) must be provided", 400);
        }
        const updateData = {};
        if (data.title)
            updateData.title = data.title.trim();
        if (data.description)
            updateData.description = data.description.trim();
        if (data.complete)
            updateData.complete = data.complete;
        try {
            const updated = await todo_schema_1.default.findByIdAndUpdate({ _id }, {
                $set: updateData,
            }, { new: true, runValidators: true });
            if (!updated)
                throw new AppError_1.default(`Todo item with id "${_id}" not found`, 404);
            return {
                id: updated.id,
                title: updated.title,
                description: updated.description,
                complete: updated.complete,
                archived: updated.archived,
                userId: updated.userId.toString()
            };
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Unknown error");
            WinstonLoggerAdapter_1.default.error("[TodoService:updateTodoItem] Failed to update todo item", {
                message: error.message,
                stack: error.stack,
                _id,
                data,
            });
            throw new AppError_1.default("Failed to update todo item", 500);
        }
    }
    /**
     * Deletes a Todo item by ID.
     *
     * @param {string} _id - The ID of the Todo item to delete.
     * @returns {Promise<TTodoItem>} The deleted Todo item.
     * @throws {AppError} If the item is not found or deletion fails.
     */
    async delete(_id) {
        try {
            const deleted = await todo_schema_1.default.findByIdAndDelete(_id, {
                archived: true,
            }).lean();
            if (!deleted)
                throw new AppError_1.default(`Todo item with id "${_id}" not found`, 404);
            return {
                id: deleted.id,
                title: deleted.title,
                description: deleted.description,
                complete: deleted.complete,
                archived: deleted.archived,
                userId: deleted.userId.toString(),
            };
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Unknown error");
            WinstonLoggerAdapter_1.default.error("[TodoService:deleteTodoItem] Failed to delete item", {
                message: error.message,
                stack: error.stack,
                _id,
            });
            throw new AppError_1.default("Failed to delete todo item", 500);
        }
    }
    async countPendingByUser(userId) {
        try {
            return await todo_schema_1.default.countDocuments({ userId, complete: false });
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Unknown error");
            WinstonLoggerAdapter_1.default.error("[TodoService:countPendingByUser] Failed to delete item", {
                message: error.message,
                stack: error.stack,
            });
            throw new AppError_1.default("Failed to countPendingByUser todo item", 500);
        }
    }
}
// creamos el singleton
const todoRepository = new MongoDBTodoRepository();
exports.default = todoRepository;
