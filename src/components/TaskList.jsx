import TaskItem from './TaskItem.jsx';

export default function TaskList({ tasks, isLoading, view, onToggle, onDelete }) {
  if (isLoading) {
    return (
      <div className="task-state loading-state" role="status">
        <span className="loading-indicator" aria-hidden="true" />
        <span>Getting your tasks ready...</span>
      </div>
    );
  }

  if (tasks.length === 0) {
    const emptyCopy = view === 'today'
      ? ['Nothing due today', 'A little breathing room. Add a task whenever you are ready.']
      : view === 'upcoming'
        ? ['No upcoming tasks', 'Tasks with a future due date will show up here.']
        : view === 'completed'
          ? ['No completed tasks yet', 'Finished tasks will be collected here.']
          : ['Your list is clear', 'Add your first task above and make a start.'];

    return (
      <div className="task-state empty-state">
        <div className="empty-mark" aria-hidden="true">✓</div>
        <h3>{emptyCopy[0]}</h3>
        <p>{emptyCopy[1]}</p>
      </div>
    );
  }

  return (
    <ul className="task-list" aria-label="Tasks">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}