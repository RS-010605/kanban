import { useEffect, useState } from "react";
import TaskForm from "./Components/TaskForm";
import TaskColumn from "./Components/TaskColumn";

function App() {
  // Load saved tasks when the app starts
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("kanbanTasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Save tasks whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task or update an existing task
  function saveTask(task) {
    if (editingTask) {
      setTasks((oldTasks) =>
        oldTasks.map((item) => (item.id === task.id ? task : item)),
      );

      setEditingTask(null);
    } else {
      setTasks((oldTasks) => [...oldTasks, task]);
    }
  }

  // Edit task
  function editTask(task) {
    setEditingTask(task);
  }

  // Delete task
  function deleteTask(id) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!shouldDelete) return;

    setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id));

    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
    }
  }

  // Change task status
  function changeStatus(id, newStatus) {
    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  }

  // Search and filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Prepare tasks for each column
  const todoTasks = filteredTasks.filter((task) => task.status === "todo");

  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "inprogress",
  );

  const completedTasks = filteredTasks.filter(
    (task) => task.status === "completed",
  );

  function clearFilters() {
    setSearch("");
    setPriorityFilter("All");
    setStatusFilter("All");
  }

  return (
    <main className="h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              TASK MANAGEMENT
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              My Kanban Board
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Plan your work. Track your progress.
            </p>
          </div>

          <div className="rounded-xl bg-indigo-50 px-4 py-3">
            <p className="text-sm text-indigo-600">Total tasks</p>
            <p className="text-2xl font-bold text-indigo-800">{tasks.length}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Search and filters */}
        <section className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <label
              htmlFor="task-search"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Search tasks
            </label>

            <input
              id="task-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by task title..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="priority-filter"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Filter by priority
            </label>

            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5"
            >
              <option value="All">All priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="status-filter"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Filter by status
            </label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5"
            >
              <option value="All">All statuses</option>
              <option value="todo">Todo</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {(search || priorityFilter !== "All" || statusFilter !== "All") && (
            <div className="sm:col-span-2 lg:col-span-4">
              <button
                onClick={clearFilters}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* Form and board */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside>
            <TaskForm
              onSave={saveTask}
              editingTask={editingTask}
              onCancel={() => setEditingTask(null)}
            />
          </aside>

          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Your tasks</h2>

              <span className="text-sm text-slate-500">
                {filteredTasks.length} shown
              </span>
            </div>

            {/* No tasks have been created */}
            {tasks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
                <div className="text-4xl">📝</div>

                <h3 className="mt-3 font-semibold text-slate-800">
                  Your board is empty
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Create your first task using the form.
                </p>
              </div>
            ) : filteredTasks.length === 0 ? (
              /* Tasks exist, but none match the filters */
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
                <h3 className="font-semibold text-slate-800">
                  No matching tasks found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try another search or change your filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              /* Kanban columns */
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <TaskColumn
                  title="Todo"
                  status="todo"
                  tasks={todoTasks}
                  onEdit={editTask}
                  onDelete={deleteTask}
                  onStatusChange={changeStatus}
                />

                <TaskColumn
                  title="In Progress"
                  status="inprogress"
                  tasks={inProgressTasks}
                  onEdit={editTask}
                  onDelete={deleteTask}
                  onStatusChange={changeStatus}
                />

                <TaskColumn
                  title="Completed"
                  status="completed"
                  tasks={completedTasks}
                  onEdit={editTask}
                  onDelete={deleteTask}
                  onStatusChange={changeStatus}
                />
              </div>
            )}
          </section>
        </div>

        <footer className="border-t border-slate-200 pt-4 text-center text-sm text-slate-500">
          Your tasks are saved locally in this browser.
        </footer>
      </div>
    </main>
  );
}

export default App;
