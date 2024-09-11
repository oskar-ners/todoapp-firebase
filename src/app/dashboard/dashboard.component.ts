import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { TodoInterface } from '../interfaces/todo.interface';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AddTaskComponent } from '../add-task/add-task.component';
import { RemoveTaskComponent } from '../remove-task/remove-task.component';
import { TaskDoneComponent } from '../task-done/task-done.component';
import { DatePipe, NgClass, NgStyle, TitleCasePipe } from '@angular/common';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { Auth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    AddTaskComponent,
    RemoveTaskComponent,
    TaskDoneComponent,
    EditTaskComponent,
    RouterLink,
    NgClass,
    NgStyle,
    DatePipe,
    TitleCasePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  todoService = inject(TodoService);
  firebaseAuth = inject(Auth);

  private todosSubscription: Subscription | undefined;

  todoList: TodoInterface[] = [];
  isToDoVisible?: boolean = false;

  ngOnInit(): void {
    this.loadTodos();
  }

  ngOnDestroy(): void {
    if (this.todosSubscription) {
      this.todosSubscription?.unsubscribe();
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
}
