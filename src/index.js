import './style.css';

// The rest of your JS code...
import Project from './project.js';
import Todo from './todo.js';
import { renderProjects, renderTodos } from './dom.js';
import { loadProjects, saveProjects } from './storage.js';

// Load projects from localStorage or create a default project
let projects = loadProjects();
if (!projects) {
  const defaultProject = new Project('Default');
  const sampleTodo = new Todo('Sample Task', 'This is a sample todo', new Date().toISOString().split('T')[0], 'medium');
  defaultProject.addTodo(sampleTodo);
  projects = [defaultProject];
  saveProjects(projects);
} else {
  // In a complete app, you might want to restore prototypes for loaded projects/todos.
}

// Initial rendering
renderProjects(projects);
if (projects.length > 0) {
  renderTodos(projects[0].todos, projects[0]);
}

// Event listener for adding a new project
document.getElementById('addProjectForm').addEventListener('submit', e => {
  e.preventDefault();
  const projectName = e.target.elements.projectName.value.trim();
  if (projectName) {
    const newProject = new Project(projectName);
    projects.push(newProject);
    saveProjects(projects);
    renderProjects(projects);
    e.target.reset();
  }
});

// Event listener for adding a new todo
document.getElementById('addTodoForm').addEventListener('submit', e => {
  e.preventDefault();
  const title = e.target.elements.title.value.trim();
  const description = e.target.elements.description.value.trim();
  const dueDate = e.target.elements.dueDate.value;
  const priority = e.target.elements.priority.value;

  if (title && dueDate) {
    const todo = new Todo(title, description, dueDate, priority);
    const projectsContainer = document.getElementById('projects');
    const selectedIndex = projectsContainer.dataset.selectedIndex || 0;
    projects[selectedIndex].todos.push(todo);
    saveProjects(projects);
    renderTodos(projects[selectedIndex].todos, projects[selectedIndex]);
    e.target.reset();
  }
});
