import TodoCard from "./TodoCard";
import { type Todo } from "../types/todos";
import { useState } from "react";
import Button from "./Button";

interface TodosProps {
  todoList: Todo[];
}

export default function Todos({ todoList }: TodosProps) {
  const [todos, setTodos] = useState<Todo[]>(todoList);
  const [hideDone, setHideDone] = useState<boolean>(false);
  const [showAddTodoForm, setShowAddTodoForm] = useState<boolean>(false);

  function handleTodoStatusToggle(name: string) {
    const allTodos = todos.map((t) => {
      if (t.name === name) {
        if (t.status === "done") {
          t.status = "todo";
        } else {
          t.status = "done";
        }
        return t;
      } else {
        return t;
      }
    });
    setTodos([...allTodos]);
  }

  function handleHideDoneToggle() {
    setHideDone(!hideDone);
  }

  function handleCancelAddTodo() {
    setShowAddTodoForm(false);
  }

  function handleAddTodo(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newTodo: Todo = {
      name: formData.get("todo-name") as string,
      description: (formData.get("todo-description") as string) || "",
      status: "todo",
    };

    setTodos((prev) => [...prev, newTodo]);
    setShowAddTodoForm(false);
  }

  const todoItems = todos.filter((item) => item.status === "todo");
  const shownTodos = hideDone ? todoItems : todos;

  return (
    <div className="flex flex-col w-4/5 md:w-3/4">
      {!showAddTodoForm && (
        <>
          <div className="flex flex-col gap-4 items-center md:flex-row justify-between my-6">
            <Button variant="primary" onClick={() => setShowAddTodoForm(true)}>
              Add New
            </Button>
            <div className="flex flex-row gap-1 items-center justify-center">
              <input
                type="checkbox"
                name="hide-done"
                id="hide-done"
                className="w-4 h-4"
                onChange={handleHideDoneToggle}
                checked={hideDone}
              />
              <label htmlFor="hide-done">Hide done</label>
            </div>
          </div>
          {shownTodos?.length === 0 && (
            <h2 className="text-white text-2xl text-center">
              Great job completing all your ToDos!
            </h2>
          )}
          <div className="flex flex-col gap-8">
            {shownTodos.map((item) => (
              <TodoCard
                todo={item}
                onToggleStatus={handleTodoStatusToggle}
                key={item.name}
              />
            ))}
          </div>
        </>
      )}
      {showAddTodoForm && (
        <>
          <div className="flex flex-col items-center bg-white text-slate-800 rounded-md mt-6 py-6">
            <form className="flex flex-col gap-3" onSubmit={handleAddTodo}>
              <h2 className="text-2xl text-center">Add New ToDo</h2>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <label htmlFor="todo-name">
                  Task <span className="text-red-700 text-md font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="todo-name"
                  name="todo-name"
                  className="border border-slate-600 px-2 py-1 w-3/4"
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <label htmlFor="todo-description">Description (optional)</label>
                <textarea
                  id="todo-description"
                  name="todo-description"
                  className="border border-slate-600 px-2 py-1 w-full"
                />
              </div>
              <div className="flex flex-col justify-center items-center md:flex-row md:justify-end gap-4 mt-4">
                <Button
                  className="w-full"
                  variant="secondary"
                  type="button"
                  onClick={handleCancelAddTodo}
                >
                  Cancel
                </Button>
                <Button className="w-full" variant="primary" type="submit">
                  Add
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
