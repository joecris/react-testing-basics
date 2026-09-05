import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoCard from "./TodoCard";
import { type Todo } from "../types/todos";

describe("TodoCard", () => {
  const doneItem: Todo = {
    name: "A Done item",
    description: "This is a done item description",
    status: "done",
  };

  const todoItem: Todo = {
    name: "A Todo item",
    description: "This is a todo item description",
    status: "todo",
  };

  let handleToggleStatus: (name: string) => void;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    handleToggleStatus = vi.fn<(name: string) => void>();
    user = userEvent.setup();
  });

  test("renders todo content correctly and uses correct card variant", () => {
    render(<TodoCard todo={todoItem} onToggleStatus={handleToggleStatus} />);

    expect(screen.getByText("A Todo item")).toBeInTheDocument();
    expect(
      screen.getByText("This is a todo item description"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Mark as Done" }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("todo-card")).toHaveClass("bg-white");
  });

  test("renders done content correctly and uses correct card variant", () => {
    render(<TodoCard todo={doneItem} onToggleStatus={handleToggleStatus} />);

    expect(screen.getByText("A Done item")).toBeInTheDocument();
    expect(
      screen.getByText("This is a done item description"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Mark as ToDo" }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("todo-card")).toHaveClass(
      "bg-green-700",
      "text-white",
    );
  });

  test("handles button call correctly when clicked", async () => {
    render(<TodoCard todo={todoItem} onToggleStatus={handleToggleStatus} />);

    const todoCardBtn = screen.getByRole("button", { name: "Mark as Done" });
    await user.click(todoCardBtn);

    expect(handleToggleStatus).toHaveBeenCalledExactlyOnceWith(
      todoItem.name,
    );
  });
});
