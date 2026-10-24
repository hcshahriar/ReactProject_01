import { useEffect, useState } from 'react';

const STORAGE_KEY = 'daymark.tasks.v1';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storageError, setStorageError] = useState('');

  useEffect(() => {
    try {
      const savedTasks = window.localStorage.getItem(STORAGE_KEY);
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        if (!Array.isArray(parsedTasks)) {
          throw new Error('Saved tasks are not in the expected format.');
        }
        setTasks(parsedTasks);
      }
    } catch {
      setStorageError('Your saved tasks could not be loaded. You can still add tasks in this session.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      setStorageError('Changes could not be saved in this browser. Check your storage settings.');
    }
  }, [isLoading, tasks]);

  function addTask(task) {
    const title = task.title.trim();
    if (!title) return false;

    setTasks((currentTasks) => [
      {
        id: crypto.randomUUID(),
        title,
        dueDate: task.dueDate || '',
        priority: task.priority,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      },
      ...currentTasks,
    ]);
    return true;
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) => currentTasks.map((task) => {
      if (task.id !== taskId) return task;
      const completed = !task.completed;
      return {
        ...task,
        completed,
        completedAt: completed ? new Date().toISOString() : null,
      };
    }));
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  return { tasks, isLoading, storageError, addTask, toggleTask, deleteTask };
}