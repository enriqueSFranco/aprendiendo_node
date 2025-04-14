"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoItemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.todoItemSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    complete: Boolean,
}, { timestamps: true });
const TodoItemModel = (0, mongoose_1.model)("Todo", exports.todoItemSchema);
// export interface TodoItem extends TTodoItem, Document {}
exports.default = TodoItemModel;
