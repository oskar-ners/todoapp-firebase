import { Component, Input, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-remove-task',
  standalone: true,
  imports: [],
  template: `<button (click)="removeToDo()">Remove</button>`,
  styleUrls: ['../dashboard/dashboard.component.scss'],
})
export class RemoveTaskComponent {
  todoService = inject(TodoService);

  @Input({ required: true }) toDoId!: number;

  removeToDo(): void {
    this.todoService.removeToDo(this.toDoId);
  }
}
