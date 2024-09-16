import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { TodoInterface } from '../interfaces/todo.interface';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="edit-task-container">
      <input
        class="edit-task-container-input"
        type="text"
        placeholder="Change your task name"
        [(ngModel)]="editedTaskName"
        (keyup.enter)="editToDo(toDoId, editedTaskName)"
      />
      <button
        class="edit-task-container-button"
        (click)="editToDo(toDoId, editedTaskName)"
      >
        Edit Task
      </button>
      <button
        (click)="toDoList[toDoId].isEditing = false"
        class="edit-task-container-button back"
      >
        Back
      </button>
    </div>
  `,
  styleUrls: ['../to-do-app/to-do-app.component.scss'],
})
export class EditTaskComponent {
  todoService = inject(TodoService);

  @Input({ required: true }) toDoId!: number;

  @Input({ required: true }) toDoList!: TodoInterface[];

  editedTaskName: string = '';

  editToDo(toDoId: number, editedTaskName: string) {
    this.todoService.editToDo(toDoId, editedTaskName);
  }
}
