import { Component, Input, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-remove-task',
  standalone: true,
  imports: [],
  template: `
    <div class="remove-task">
      <button class="remove-task-button" (click)="removeToDo()">Remove</button>
    </div>
  `,
  styleUrls: ['../to-do-app/to-do-app.component.scss'],
})
export class RemoveTaskComponent {
  todoService = inject(TodoService);

  @Input({ required: true }) toDoId!: number;

  removeToDo(): void {
    this.todoService.removeToDo(this.toDoId);
  }
}
