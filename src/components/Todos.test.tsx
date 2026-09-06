import Todos from "./Todos";
import { type Todo } from "../types/todos";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Todos", () => {
  const testTodos: Todo[] = [
    {
      name: "Water the plants",
      description: "Do not overwater though!",
      status: "todo",
    },
    {
      name: "Walk the dog",
      description: "Bring the cat too",
      status: "todo",
    },
    {
      name: "Read the book",
      description: "finish reading the book",
      status: "done",
    },
    {
      name: "Foo",
      status: "done",
    },
  ];

  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test("renders headings and buttons", () => {
    render(<Todos todoList={testTodos} />);
    expect(screen.getByRole("button", { name: "Add New" })).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Hide done" }),
    ).toBeInTheDocument();
  });

  test("renders empty todos state", () => {
    render(<Todos todoList={[]} />);

    expect(
      screen.getByText("Great job completing all your ToDos!"),
    ).toBeInTheDocument();
  });

  test("renders todo cards", () => {
    render(<Todos todoList={testTodos} />);

    expect(screen.getAllByTestId("todo-card").length).toBe(testTodos.length);
  });

  test("hides done items when checkbox is checked", async () => {
    render(<Todos todoList={testTodos} />);

    expect(screen.getAllByTestId("todo-card").length).toBe(testTodos.length);

    const hideDoneCheckbox = screen.getByRole("checkbox", {
      name: "Hide done",
    });

    await user.click(hideDoneCheckbox);

    // hides one of the cards (done item)
    expect(screen.getAllByTestId("todo-card").length).toBe(2);
  });

  test("marks item as done when button is clicked", async () => {
    render(<Todos todoList={testTodos} />);

    const todoCardBtns = screen.queryAllByRole("button", {
      name: "Mark as Done",
    });

    await user.click(todoCardBtns[0]);

    const updatedTodoCardBtns = screen.queryAllByRole("button", {
      name: "Mark as Done",
    });

    expect(updatedTodoCardBtns.length).toBe(todoCardBtns.length - 1);
  });

  test("marks item as todo when button is clicked", async () => {
    render(<Todos todoList={testTodos} />);

    const doneCardBtns = screen.queryAllByRole("button", {
      name: "Mark as ToDo",
    });

    await user.click(doneCardBtns[0]);

    const updatedDoneCardBtns = screen.queryAllByRole("button", {
      name: "Mark as ToDo",
    });

    expect(updatedDoneCardBtns.length).toBe(doneCardBtns.length - 1);
  });

  test("shows Add New Todo form when Add New button is clicked", async () => {
    render(<Todos todoList={testTodos} />);

    const addNewBtn = screen.getByRole("button", { name: "Add New" });

    await user.click(addNewBtn);

    expect(screen.getByText("Add New ToDo")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /task/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /description/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  test("hides form when cancel button is clicked", async () => {
    render(<Todos todoList={testTodos} />);

    const addNewBtn = screen.getByRole("button", { name: "Add New" });

    await user.click(addNewBtn);

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });

    await user.click(cancelBtn);

    expect(screen.queryByText("Add New ToDo")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", { name: /task/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", { name: /description/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Cancel" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Add" }),
    ).not.toBeInTheDocument();
  });

  test("adds new item when form is submitted", async () => {
    render(<Todos todoList={testTodos} />);

    const initCardCount = screen.getAllByTestId("todo-card").length;

    const addNewBtn = screen.getByRole("button", { name: "Add New" });

    await user.click(addNewBtn);

    await user.type(screen.getByRole("textbox", { name: /task/i }), "New Todo");
    await user.type(
      screen.getByRole("textbox", { name: /description/i }),
      "some new description",
    );

    const formSubmitBtn = screen.getByRole("button", { name: "Add" });

    await user.click(formSubmitBtn);

    expect(screen.getAllByTestId("todo-card").length).toBe(initCardCount + 1);
    expect(screen.getByText("New Todo")).toBeInTheDocument();
    expect(screen.getByText("some new description")).toBeInTheDocument();
  });

  test("adds new item when form is submitted with empty description", async () => {
    render(<Todos todoList={testTodos} />);

    const initCardCount = screen.getAllByTestId("todo-card").length;

    const addNewBtn = screen.getByRole("button", { name: "Add New" });

    await user.click(addNewBtn);

    await user.type(screen.getByRole("textbox", { name: /task/i }), "New Todo");

    const formSubmitBtn = screen.getByRole("button", { name: "Add" });

    await user.click(formSubmitBtn);

    expect(screen.getAllByTestId("todo-card").length).toBe(initCardCount + 1);
    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });
});
