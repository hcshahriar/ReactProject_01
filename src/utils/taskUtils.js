export function getTodayISO() {
  const date = new Date();
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

export function getTaskStats(tasks) {
  const today = getTodayISO();
  const completedToday = tasks.filter((task) => (
    task.completedAt && task.completedAt.slice(0, 10) === today
  )).length;
  const dueToday = tasks.filter((task) => (
    !task.completed && task.dueDate === today
  )).length;
  const remaining = tasks.filter((task) => !task.completed).length;

  return { completedToday, dueToday, remaining };
}

export function filterTasks(tasks, { view, status, query }) {
  const today = getTodayISO();
  const normalizedQuery = query.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesView = view === 'today'
      ? task.dueDate === today && !task.completed
      : view === 'upcoming'
        ? task.dueDate > today && !task.completed
        : view === 'completed'
          ? task.completed
          : true;
    const matchesStatus = status === 'active'
      ? !task.completed
      : status === 'completed'
        ? task.completed
        : true;
    const matchesQuery = !normalizedQuery || task.title.toLowerCase().includes(normalizedQuery);

    return matchesView && matchesStatus && matchesQuery;
  });
}

export function formatDueDate(dueDate) {
  if (!dueDate) return '';
  const date = new Date(`${dueDate}T12:00:00`);
  const today = getTodayISO();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = new Date(tomorrowDate.getTime() - tomorrowDate.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  if (dueDate === today) return 'Due today';
  if (dueDate === tomorrow) return 'Tomorrow';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date);
}

export function formatLongDate(date = new Date()) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
}