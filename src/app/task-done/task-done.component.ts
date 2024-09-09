import { Component, Input, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-task-done',
  standalone: true,
  imports: [],
  template: `<button (click)="toDoDone()">
    {{ isCompleted ? 'Undone' : 'Done' }}
  </button>`,
  styleUrls: ['../dashboard/dashboard.component.scss'],
})
export class TaskDoneComponent {
  todoService = inject(TodoService);

  @Input({ required: true }) toDoId!: number;
  @Input({ required: true }) isCompleted!: boolean;

  toDoDone(): void {
    this.todoService.toDoDone(this.toDoId);
  }
}
