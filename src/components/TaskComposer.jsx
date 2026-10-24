import { useState } from 'react';

export default function TaskComposer({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [validationMessage, setValidationMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) {
      setValidationMessage('Enter a task to add it to your list.');
      return;
    }

    onAddTask({ title, dueDate, priority });
    setTitle('');
    setDueDate('');
    setPriority('medium');
    setValidationMessage('');
  }

  return (
    <form className="composer" onSubmit={handleSubmit} noValidate>
      <label className="visually-hidden" htmlFor="new-task">What needs your attention?</label>
      <div className="composer-main">
        <span className="composer-plus" aria-hidden="true">+</span>
        <input
          id="new-task"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (validationMessage) setValidationMessage('');
          }}
          placeholder="Add a task..."
          maxLength={120}
          aria-describedby={validationMessage ? 'task-validation' : undefined}
        />
        <button className="add-task-button" type="submit">Add task</button>
      </div>
      <div className="composer-options">
        <label className="composer-option">
          <span className="option-dot due-dot" aria-hidden="true" />
          <span className="visually-hidden">Due date</span>
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            aria-label="Due date"
          />
        </label>
        <label className="composer-option priority-select">
          <span className="option-dot priority-dot" aria-hidden="true" />
          <span className="visually-hidden">Priority</span>
          <select value={priority} onChange={(event) => setPriority(event.target.value)} aria-label="Priority">
            <option value="low">Low priority</option>
            <option value="medium">Medium priority</option>
            <option value="high">High priority</option>
          </select>
        </label>
        {validationMessage && <span className="validation-message" id="task-validation" role="alert">{validationMessage}</span>}
      </div>
    </form>
  );
}