import { Component, inject } from '@angular/core';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TodoInterface } from '../interfaces/todo.interface';
import { Timestamp } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { TodoService } from '../services/todo.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { RemoveTaskComponent } from '../remove-task/remove-task.component';
import { TaskDoneComponent } from '../task-done/task-done.component';
import { DatePipe, NgClass, NgStyle, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-to-do-app',
  standalone: true,
  imports: [
    AddTaskComponent,
    EditTaskComponent,
    RemoveTaskComponent,
    TaskDoneComponent,
    NgClass,
    NgStyle,
    TitleCasePipe,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './to-do-app.component.html',
  styleUrl: './to-do-app.component.scss',
})
export class ToDoAppComponent {
  todoService = inject(TodoService);
  firebaseAuth = inject(Auth);

  todoList: TodoInterface[] = [];

  private todosSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.loadTodos();
  }

  ngOnDestroy(): void {
    if (this.todosSubscription) {
      this.todosSubscription?.unsubscribe();
    }
  }

  filterList(value: string): void {
    if (value === 'overdue') {
      const today = Timestamp.fromDate(new Date());
      const filteredList = this.todoList.filter((todo) => {
        const todoDate = todo.deadlineDate;
        return todoDate < today;
      });
      this.todoList = filteredList;
    } else if (value === 'all') {
      this.loadTodos();
    } else {
      this.todoList.sort((a, b) => {
        const priorityOrder: Record<string, number> = {
          high: 1,
          medium: 2,
          low: 3,
        };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    }
  }

  loadTodos(): void {
    this.todosSubscription = this.todoService.getTodos()?.subscribe(
      (todos) => {
        this.todoList = todos;
      },
      (error) => {
        console.error(error.message);
      }
    );
  }
}
