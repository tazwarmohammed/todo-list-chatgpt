import { format } from 'date-fns';

export default class Todo {
  constructor(title, description, dueDate, priority, notes = '', checklist = []) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate; // expect an ISO date string or Date object
    this.priority = priority; // e.g., "low", "medium", "high"
    this.notes = notes;
    this.checklist = checklist; // array of { task: string, completed: boolean }
    this.completed = false;
  }

  getFormattedDueDate() {
    return format(new Date(this.dueDate), 'MMM dd, yyyy');
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  updateDetails({ title, description, dueDate, priority, notes, checklist }) {
    if (title) this.title = title;
    if (description) this.description = description;
    if (dueDate) this.dueDate = dueDate;
    if (priority) this.priority = priority;
    if (notes) this.notes = notes;
    if (checklist) this.checklist = checklist;
  }
}
