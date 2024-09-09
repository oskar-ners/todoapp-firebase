import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="edit-task-container">
      <input
        type="text"
        placeholder="Change your task name"
        [(ngModel)]="editedTaskName"
        (keyup.enter)="editToDo(toDoId, editedTaskName)"
      />
      <button (click)="editToDo(toDoId, editedTaskName)">Edit Task</button>
    </div>
  `,
  styleUrl: '../dashboard/dashboard.component.scss',
})
export class EditTaskComponent {
  todoService = inject(TodoService);

  @Input({ required: true }) toDoId!: number;

  editedTaskName: string = '';

  editToDo(toDoId: number, editedTaskName: string) {
    this.todoService.editToDo(toDoId, editedTaskName);
  }
}
