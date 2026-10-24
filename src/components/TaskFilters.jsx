const filters = [
  { id: 'all', label: 'All tasks' },
  { id: 'active', label: 'In progress' },
  { id: 'completed', label: 'Completed' },
];

export default function TaskFilters({ activeFilter, onChangeFilter, query, onChangeQuery }) {
  return (
    <div className="task-toolbar">
      <div className="filter-tabs" role="tablist" aria-label="Filter tasks by status">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter.id}
            className={`filter-tab ${activeFilter === filter.id ? 'is-selected' : ''}`}
            onClick={() => onChangeFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <label className="search-field">
        <span className="search-icon" aria-hidden="true" />
        <span className="visually-hidden">Search tasks</span>
        <input
          type="search"
          value={query}
          onChange={(event) => onChangeQuery(event.target.value)}
          placeholder="Search tasks"
        />
        <kbd aria-hidden="true">/</kbd>
      </label>
    </div>
  );
}