# Daymark

A focused task manager for freelancers and students. Capture work quickly, set a priority and due date, then filter your list to see what needs attention.

**Live preview:** [Open Daymark](https://hcshahriar.github.io/ReactProject_01/)

The preview is published with GitHub Pages after the deployment workflow completes on `main`.

## Features

- Add tasks with priority and an optional due date
- Mark tasks complete or remove them
- Browse all, today's, upcoming, and completed tasks
- Search tasks and filter by completion status
- Save tasks in the browser with `localStorage`
- Responsive layout with keyboard-accessible controls

## Tech Stack

- React 18 with functional components and hooks
- Vite
- Plain CSS
- `useState` and a custom `useTasks` hook
- Browser `localStorage` (no backend required)
- JavaScript

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`; use `npm run preview` to preview it locally.

## Screenshot

_Screenshot placeholder: add a capture of the Daymark task dashboard here._

## Project Structure

```text
src/
	components/
		Sidebar.jsx
		TaskComposer.jsx
		TaskFilters.jsx
		TaskItem.jsx
		TaskList.jsx
	hooks/
		useTasks.js
	utils/
		taskUtils.js
	App.jsx
	main.jsx
	styles.css
index.html
vite.config.js
```

## Future Improvements

- Edit task titles and details in place
- Add labels, projects, and saved filters
- Support recurring tasks and reminders
- Add an export/import option for backups
- Sync tasks across devices with an account-based backend