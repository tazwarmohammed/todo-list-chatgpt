import { saveProjects } from './storage.js';

// Ensure currentProject is an instance of Project
let currentProject = new Project('Default Project');

export function renderProjects(projects) {
  const projectsContainer = document.getElementById('projects');
  projectsContainer.innerHTML = '';

  projects.forEach((project, index) => {
    const projectElem = document.createElement('div');
    projectElem.classList.add('project');
    projectElem.textContent = project.name;
    projectsContainer.appendChild(projectElem);

    projectElem.addEventListener('click', () => {
      // Pass the project object when rendering todos
      renderTodos(project.todos, project);
      projectsContainer.dataset.selectedIndex = index;
    });
  });
}

export function renderTodos(todos, currentProject) {
  const todosContainer = document.getElementById('todos');
  todosContainer.innerHTML = '';

  todos.forEach(todo => {
    const todoElem = document.createElement('div');
    todoElem.classList.add('todo');

    // Use formatted due date if available (in case object is an instance)
    const dueDateText = todo.getFormattedDueDate ? todo.getFormattedDueDate() : todo.dueDate;
    todoElem.innerHTML = `<h3>${todo.title}</h3><p>Due: ${dueDateText}</p>`;
    todosContainer.appendChild(todoElem);

    // Expand to show details on click
    todoElem.addEventListener('click', () => {
      alert(`Title: ${todo.title}\nDescription: ${todo.description}\nDue Date: ${dueDateText}\nPriority: ${todo.priority}`);
    });

    // Add delete button with working delete functionality
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentProject.removeTodo(todo.title);
      saveProjects(projects); // You'll need to make 'projects' accessible here
      renderTodos(currentProject.todos, currentProject);
    });
    todoElem.appendChild(deleteBtn);
  });
}

// Example of how removeTodo might be used
document.querySelector('button').addEventListener('click', function() {
    const todoId = this.getAttribute('data-todo-id');
    currentProject.removeTodo(todoId);
});
