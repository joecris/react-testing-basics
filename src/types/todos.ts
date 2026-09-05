export type TodoStatus = "todo" | "done";

export interface Todo {
  name: string;
  description?: string;
  status: TodoStatus;
}
