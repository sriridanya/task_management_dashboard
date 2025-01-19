# Task Management Dashboard

This is a simple task management dashboard built with React, Redux, and Material-UI. It allows you to manage your tasks, providing functionality to **add**, **edit**, **delete**, and **filter** tasks based on status and priority.

## Features

- **Add Task**: Create new tasks with a title, description, due date, and priority.
- **Edit Task**: Edit existing tasks' details (title, description, due date, and priority).
- **Delete Task**: Remove tasks from the list.
- **Filter Tasks**: Filter tasks by status (completed, pending) and priority (high, medium, low).
- **Sort Tasks**: Sort tasks by title or due date.
- **Task Completion**: Mark tasks as completed or pending.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Redux**: State management tool to manage the tasks' state globally.
- **Material-UI**: A set of React components that implement Google's Material Design.
- **React-Redux**: The official Redux binding for React.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (including npm)
- [Git](https://git-scm.com/)

## Getting Started

### Steps to Set Up the Project Locally

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/task_management_dashboard.git
    cd task_management_dashboard
    ```

2. **Install dependencies:**

    Run the following command to install all the required dependencies:

    ```bash
    npm install
    ```

3. **Start the development server:**


    Once the dependencies are installed, you can start the development server:

    ```bash
    npm start
    ```

    The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

### Add Task

- Click on the **"Add Task"** button to open a form.
- Fill in the following fields:
  - **Task Title**
  - **Description**
  - **Due Date**
  - **Priority**
- Once the form is filled out, click the **"Add Task"** button to save the task.

### Edit Task

- Click the **"Edit"** button on any task to modify its details.
- Update the task's title, description, due date, or priority, and click **"Save Changes"**.

### Delete Task

- Click the **"Delete"** button next to any task to remove it from the task list.

### Filter Tasks

- Use the filter dropdowns to filter tasks by:
  - **Status**: Completed or Pending.
  - **Priority**: High, Medium, or Low.

### Task Statistics

- View the task completion statistics displayed in a bar chart format, showing the count of **completed** vs **pending** tasks.

## Redux Store

The Redux store manages the state of the tasks. Here is the basic structure of the store:

```js
{
  tasks: [
    {
      id: 1,
      title: "Task 1",
      description: "Description of Task 1",
      dueDate: "2025-01-01",
      priority: "high",
      completed: false
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description of Task 2",
      dueDate: "2025-01-02",
      priority: "medium",
      completed: true
    }
    // Additional tasks...
  ]
}

```
## License

This project is not licensed.

## Acknowledgements

- **React**: A JavaScript library for building user interfaces. It is used to create the interactive components in this application.  
  [React Documentation](https://reactjs.org/)

- **Redux**: A predictable state container for JavaScript apps. It is used to manage the state of the task list in this project.  
  [Redux Documentation](https://redux.js.org/)

- **Material-UI**: A popular React UI framework. Material-UI provides the components such as buttons, cards, and forms used throughout this app.  
  [Material-UI Documentation](https://mui.com/)

- **Chart.js**: A library that allows easy generation of charts and graphs. It is used in this project to display the task completion statistics as a bar chart.  
  [Chart.js Documentation](https://www.chartjs.org/)

- **GitHub**: For hosting the project repository and providing version control.  
  [GitHub Website](https://github.com/)

- **Icons8**: For the free task icons used in this project.  
  [Icons8 Website](https://icons8.com/)

