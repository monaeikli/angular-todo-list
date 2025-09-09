import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://boolean-uk-api-server.fly.dev/monaeikli/todo';
  constructor(private http: HttpClient) {}

   getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(title: string): Observable<Todo> {
    const todo = {
      title: title,
      completed: false,
    };
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${updatedTodo.id}`, updatedTodo);
  }
}
