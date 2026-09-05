import { type Todo } from "../types/todos";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
import Button from "./Button";

const todoCardVariants = cva(
  "flex flex-row justify-between items-center gap-14 text-slate-800 rounded-md shadow-md px-6 py-8",
  {
    variants: {
      variant: {
        done: "bg-green-700 text-white",
        todo: "bg-white",
      },
    },
    defaultVariants: {
      variant: "todo",
    },
  },
);

export interface TodoCardProps {
  todo: Todo;
  onToggleStatus: (name: string) => void;
}

export default function TodoCard({ todo, onToggleStatus }: TodoCardProps) {
  return (
    <div
      className={cn(todoCardVariants({ variant: todo.status }))}
      data-testid="todo-card"
    >
      <div>
        <h2 className="text-lg font-bold">{todo.name}</h2>
        {todo.description && (
          <p
            className={cn(
              todo.status === "done" ? "text-white" : "text-slate-500",
            )}
          >
            {todo.description}
          </p>
        )}
      </div>
      <Button onClick={() => onToggleStatus(todo.name)} variant="primary">
        {todo.status === "done" ? "Mark as ToDo" : "Mark as Done"}
      </Button>
    </div>
  );
}
