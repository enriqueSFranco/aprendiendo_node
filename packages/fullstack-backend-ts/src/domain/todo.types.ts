/**
 * Type for creating a new Todo item.
 * Both title and description are required.
 */
export type TCreateTodoItem = {
  /** The title of the todo item */
  title: string;
  /** The description or details of the task */
  description: string;
};

/**
 * Type for updating an existing Todo item.
 * All fields are optional and can be updated individually.
 */
export type TUpdateTodoItem = {
  /** New title (optional) */
  title?: string;
  /** New description (optional) */
  description?: string;
  /** Completion status (optional) */
  complete?: boolean;
};

/**
 * Standard representation of a Todo item.
 */
export type TTodoItem = {
  /** Unique identifier of the todo item (MongoDB _id as string) */
  id?: string;
  /** Title of the todo */
  title: string;
  /** Description of the todo */
  description: string;
  /** Whether the task is complete or not */
  complete: boolean;
  /** Creation timestamp */
  createdAt: Date;
  /** Last updated timestamp */
  updatedAt: Date;
};
