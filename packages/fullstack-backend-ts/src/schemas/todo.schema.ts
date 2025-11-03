import { model, Document, Schema, Types } from "mongoose";

interface ITodoDocument extends Document {
  title: string;
  description?: string;
  complete: boolean;
  archived: boolean;
  userId: Types.ObjectId;
}

export const todoSchema = new Schema<ITodoDocument>(
  {
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
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const TodoItemModel = model<ITodoDocument>("Todo", todoSchema);

// export interface TodoItem extends TTodoItem, Document {}
export default TodoItemModel;
