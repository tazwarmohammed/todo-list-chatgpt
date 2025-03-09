import Todo from './todo.js';

export default class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
  }

  getTodo(todoTitle) {
    return this.todos.find(todo => todo.title === todoTitle);
  }
}
