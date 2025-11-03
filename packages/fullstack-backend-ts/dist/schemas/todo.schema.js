"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoSchema = void 0;
const mongoose_1 = require("mongoose");
exports.todoSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    complete: {
        type: Boolean,
        default: false,
    },
    archived: {
        type: Boolean,
        default: false,
    },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
const TodoItemModel = (0, mongoose_1.model)("Todo", exports.todoSchema);
// export interface TodoItem extends TTodoItem, Document {}
exports.default = TodoItemModel;
