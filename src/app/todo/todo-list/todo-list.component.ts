import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  showCompleted: boolean = false;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  get filteredTodos(): Todo[] {
    return this.todos.filter(todo => this.showCompleted ? todo.completed : !todo.completed);
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => {
      this.loadTodos();
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.loadTodos();
    });
  }
}
