import { createSignal, createResource } from "solid-js";

// Fetch function to get todos (this can be skipped if you don't want to fetch from an API)
const fetchTodos = async () => {
  const response = await fetch("http://localhost:8080/todos");
  return response.json();
};

const TodoApp = () => {
  const [todos, setTodos] = createResource(fetchTodos); // Store and manage todos locally

  // Handle click to toggle the todo status locally
  const handleToggleStatus = (todo: { id: any; }) => {
    // Clone the todos array to avoid mutating the original state
    const updatedTodos = todos().map((t: { id: any; completed: any; }) =>
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos); // Update the todos state
  };

  return (
    <div class="p-4 grid grid-cols-3 gap-4">
      {todos.loading && <p>Loading...</p>}
      {todos.error && <p>Error fetching data.</p>}
      {todos()?.map((todo) => (
        <div
          class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg"
          key={todo.id}
        >
          <h3 class="text-lg font-semibold text-gray-800">
            {todo.id}. {todo.title}
          </h3>
          <p
            class={`mt-2 text-sm ${
              todo.completed ? "text-green-600" : "text-red-600"
            }`}
          >
            {todo.completed ? "Completed" : "Incomplete"}
          </p>
          <button
            onClick={() => handleToggleStatus(todo)} // Toggle status on click
            class={`mt-2 text-sm ${
              todo.completed ? "text-green-600" : "text-red-600"
            }`}
          >
            {todo.completed ? "Mark as Incomplete" : "Mark as Completed"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
