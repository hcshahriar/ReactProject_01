import { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import TaskComposer from './components/TaskComposer.jsx';
import TaskFilters from './components/TaskFilters.jsx';
import TaskList from './components/TaskList.jsx';
import { useTasks } from './hooks/useTasks.js';
import { filterTasks, formatLongDate, getTaskStats } from './utils/taskUtils.js';

const viewTitles = {
  all: 'All tasks',
  today: 'Today',
  upcoming: 'Upcoming',
  completed: 'Completed',
};

export default function App() {
  const { tasks, isLoading, storageError, addTask, toggleTask, deleteTask } = useTasks();
  const [activeView, setActiveView] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');
  const stats = getTaskStats(tasks);
  const visibleTasks = useMemo(() => filterTasks(tasks, {
    view: activeView,
    status: activeFilter,
    query,
  }), [tasks, activeView, activeFilter, query]);
  const completion = tasks.length ? Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100) : 0;

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onChangeView={setActiveView} tasks={tasks} />
      <main className="main-panel" id="main">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark" aria-hidden="true">d.</span> daymark</div>
          <span className="topbar-date">{formatLongDate()}</span>
          <button className="topbar-avatar" type="button" aria-label="Your profile">Y</button>
        </header>

        <div className="workspace-grid">
          <section className="task-workspace" aria-labelledby="page-title">
            <div className="page-heading">
              <div className="eyebrow"><span className="eyebrow-line" /> YOUR DAY, IN FOCUS</div>
              <h1 id="page-title">Make room for<br /><span>focused work.</span></h1>
              <p className="heading-date">{formatLongDate()}</p>
            </div>

            <div className="stats-row" aria-label="Task summary">
              <div className="stat-item">
                <span className="stat-value">{stats.remaining.toString().padStart(2, '0')}</span>
                <span className="stat-label">In progress</span>
              </div>
              <span className="stat-divider" aria-hidden="true" />
              <div className="stat-item">
                <span className="stat-value">{stats.dueToday.toString().padStart(2, '0')}</span>
                <span className="stat-label">Due today</span>
              </div>
              <span className="stat-divider" aria-hidden="true" />
              <div className="stat-item">
                <span className="stat-value">{stats.completedToday.toString().padStart(2, '0')}</span>
                <span className="stat-label">Done today</span>
              </div>
            </div>

            <TaskComposer onAddTask={addTask} />

            <section className="tasks-section" aria-labelledby="tasks-heading">
              <div className="section-heading-row">
                <div>
                  <h2 id="tasks-heading">{viewTitles[activeView]}</h2>
                  <span className="task-count">{visibleTasks.length} {visibleTasks.length === 1 ? 'task' : 'tasks'}</span>
                </div>
                <button className="sort-button" type="button" onClick={() => { setActiveFilter('all'); setQuery(''); }}>Clear filters</button>
              </div>
              <TaskFilters
                activeFilter={activeFilter}
                onChangeFilter={setActiveFilter}
                query={query}
                onChangeQuery={setQuery}
              />
              {storageError && <div className="storage-notice" role="status">{storageError}</div>}
              <TaskList
                tasks={visibleTasks}
                isLoading={isLoading}
                view={activeView}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            </section>
          </section>

          <aside className="insights-panel" aria-label="Your progress">
            <div className="insights-header">
              <span className="insights-kicker">A MOMENT TO CHECK IN</span>
              <span className="sparkle-mark" aria-hidden="true">✳</span>
            </div>
            <div className="progress-ring" style={{ '--progress': completion }} role="img" aria-label={`${completion}% of all tasks complete`}>
              <div className="progress-ring-inner">
                <strong>{completion}<span>%</span></strong>
                <small>complete</small>
              </div>
            </div>
            <h2>Steady progress<br />is still progress.</h2>
            <p className="insights-copy">You have completed {tasks.filter((task) => task.completed).length} of {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} on your list. Keep your focus on the next small step.</p>
            <div className="insights-rule" />
            <div className="focus-note">
              <span className="focus-note-label">TODAY'S NOTE</span>
              <p>Give your best energy to what matters most.</p>
              <span className="note-author">A gentle reminder <span aria-hidden="true">↗</span></span>
            </div>
            <div className="insights-footer"><span className="footer-dot" /> Your workspace is up to date</div>
          </aside>
        </div>
      </main>
    </div>
  );
}