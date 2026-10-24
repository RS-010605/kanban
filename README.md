# Kanban Board

A responsive Kanban task management application built with **React** and **Tailwind CSS**. It helps users organize tasks across Todo, In Progress, and Completed columns.

## Features

- **Add Tasks:** Create tasks with a title, description, priority, and due date.
- **Edit Tasks:** Update existing task details.
- **Delete Tasks:** Remove tasks with confirmation.
- **Task Status:** Move tasks between Todo, In Progress, and Completed.
- **Search:** Find tasks by title.
- **Filters:** Filter tasks by priority and status.
- **LocalStorage:** Automatically save tasks in the browser so they remain available after refreshing the page.
- **Responsive Design:** Layout adapts to desktop, tablet, and mobile screens.
- **Validation:** Require a task title and prevent past due dates.
- **Empty States:** Display helpful messages when there are no tasks or no matching results.

## Tech Stack

- React
- JavaScript (ES6+)
- Tailwind CSS
- Vite
- Browser LocalStorage

## Project Structure

```text
kanban-board/
├── src/
│   ├── components/
│   │   ├── TaskForm.jsx
│   │   ├── TaskCard.jsx
│   │   └── TaskColumn.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm, which comes with Node.js

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd kanban-board
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal, usually:

   ```text
   http://localhost:5173
   ```

## How to Use

1. Enter a task title and optionally add a description.
2. Select a priority: Low, Medium, or High.
3. Choose a due date if needed.
4. Click **Add task** to create the task.
5. Use the status dropdown to move tasks between columns.
6. Click **Edit** to update a task or **Delete** to remove it.
7. Use search and filters to find specific tasks.

## State Management

The application uses React's `useState` hook to manage tasks, search input, filters, and editing state.

The `useEffect` hook saves changes to LocalStorage whenever the task list changes. When the application starts, the saved tasks are loaded into React state.

Tasks are stored under the following LocalStorage key:

```text
kanbanTasks
```

Each task contains:

```js
{
  id: 123456789,
  title: "Complete project",
  description: "Finish the Kanban board",
  priority: "High",
  dueDate: "2026-12-31",
  status: "todo"
}
```

## Responsive Design

The interface uses Tailwind CSS responsive utilities to provide:

- A single-column layout on smaller screens.
- A two-column task board on medium screens.
- A three-column task board on larger screens.
- Responsive spacing and form layouts.

## Data Storage

Tasks are stored locally in the browser using LocalStorage.

**Important:** Task data is not stored on a server. It does not automatically synchronize between devices or browser profiles. Clearing the site's browser data may remove saved tasks.

## Future Improvements

- Drag-and-drop task management.
- Unit and component testing.
- Task sorting by due date and priority.
- Better confirmation dialogs.
- Backend integration and user authentication.
- Cloud synchronization across devices.

## License

This project is available for learning and personal use. Add a license file if you plan to distribute it publicly.
