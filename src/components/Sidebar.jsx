import { getTodayISO } from '../utils/taskUtils.js';

const navigationItems = [
  { id: 'all', label: 'All tasks' },
  { id: 'today', label: 'Today' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
];

export default function Sidebar({ activeView, onChangeView, tasks }) {
  function countForView(view) {
    const today = getTodayISO();
    if (view === 'today') {
      return tasks.filter((task) => task.dueDate === today && !task.completed).length;
    }
    if (view === 'upcoming') {
      return tasks.filter((task) => task.dueDate > today && !task.completed).length;
    }
    if (view === 'completed') return tasks.filter((task) => task.completed).length;
    return tasks.filter((task) => !task.completed).length;
  }

  return (
    <aside className="sidebar" aria-label="Main navigation">
      <a className="brand" href="#main" aria-label="Daymark home">
        <span className="brand-mark" aria-hidden="true">d.</span>
        <span>daymark</span>
      </a>

      <div className="sidebar-section-label">WORKSPACE</div>
      <nav className="primary-nav">
        {navigationItems.map((item) => (
          <button
            className={`nav-item ${activeView === item.id ? 'is-active' : ''}`}
            key={item.id}
            onClick={() => onChangeView(item.id)}
            aria-current={activeView === item.id ? 'page' : undefined}
          >
            <span className={`nav-marker nav-marker-${item.id}`} aria-hidden="true" />
            <span>{item.label}</span>
            <span className="nav-count">{countForView(item.id)}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-note-mark" aria-hidden="true">✳</div>
        <p>A clear plan makes space for good work.</p>
        <span>One thing at a time.</span>
      </div>
      <div className="profile-row">
        <div className="avatar" aria-hidden="true">Y</div>
        <div className="profile-copy">
          <strong>Your workspace</strong>
          <span>Personal plan</span>
        </div>
        <span className="profile-menu" aria-hidden="true">•••</span>
      </div>
    </aside>
  );
}