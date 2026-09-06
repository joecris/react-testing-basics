import NavBar, { type NavItems } from "./components/NavBar";
import Todos from "./components/Todos";
import { type Todo } from "./types/todos";
import usePageTitle from "./hooks/usePageTitle";

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
];

const navItems: NavItems[] = [
  { label: "Docs", href: "#docs" },
  { label: "Quickstart", href: "#quicstart" },
  { label: "Testing", href: "#testing" },
  { label: "Blog", href: "#blog" },
];

function App() {
  usePageTitle("My Todos - React Testing Overview");
  return (
    <>
      <NavBar navItems={navItems} />
      <main className="flex flex-col items-center py-8 px-12">
        <Todos todoList={testTodos} />
      </main>
    </>
  );
}

export default App;
