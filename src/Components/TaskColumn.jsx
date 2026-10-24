import TaskCard from "./TaskCard";

function TaskColumn({
  title,
  status,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-slate-100/70 p-3 sm:p-4">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="font-bold text-slate-800">{title}</h2>

        <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-600">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 px-3 py-8 text-center">
            <p className="text-sm text-slate-500">No tasks here</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default TaskColumn;
