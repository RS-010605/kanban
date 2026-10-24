function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const priorityColors = {
    Low: "bg-emerald-100 text-emerald-700",
    Medium: "bg-amber-100 text-amber-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="wrap-break-word font-semibold text-slate-800">
          {task.title}
        </h3>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="mb-3 whitespace-pre-wrap wrap-break-word text-sm text-slate-600">
          {task.description}
        </p>
      )}

      {task.dueDate && (
        <p className="mb-3 text-xs text-slate-500">Due: {task.dueDate}</p>
      )}

      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-slate-500">
          Move task
        </label>

        <select
          aria-label={`Change status of ${task.title}`}
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-sm"
        >
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex gap-2 border-t border-slate-100 pt-3">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
