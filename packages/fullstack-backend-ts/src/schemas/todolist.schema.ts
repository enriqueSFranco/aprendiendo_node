import { model, Schema } from "mongoose";

export const todoItemSchema = new Schema(
  {
    title: String,
    description: String,
    complete: Boolean,
  },
  { timestamps: true },
);

const TodoItemModel = model("Todo", todoItemSchema);

// export interface TodoItem extends TTodoItem, Document {}
export default TodoItemModel;
