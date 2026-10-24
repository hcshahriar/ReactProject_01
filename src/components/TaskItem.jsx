import { formatDueDate, getTodayISO } from '../utils/taskUtils.js';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'is-complete' : ''}`}>
      <label className="task-check-wrap">
        <input
          className="task-checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`${task.completed ? 'Mark incomplete' : 'Complete'}: ${task.title}`}
        />
        <span className="custom-check" aria-hidden="true" />
      </label>
      <div className="task-content">
        <span className="task-title">{task.title}</span>
        <div className="task-meta">
          <span className={`priority-label priority-${task.priority}`}>
            <span className="priority-indicator" aria-hidden="true" />
            {task.priority}
          </span>
          {task.dueDate && (
            <span className={`due-label ${!task.completed && task.dueDate < getTodayISO() ? 'is-overdue' : ''}`}>
              <span className="calendar-mark" aria-hidden="true">◷</span>
              {formatDueDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>
      <button
        className="delete-task-button"
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task: ${task.title}`}
      >
        Remove
      </button>
    </li>
  );
}