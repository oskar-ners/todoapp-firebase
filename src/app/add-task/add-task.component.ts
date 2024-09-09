import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['../dashboard/dashboard.component.scss'],
})
export class AddTaskComponent {
  todoService = inject(TodoService);
  taskName: string = '';

  addTask(text: string) {
    if (this.taskName.length === 0) return;
    else {
      this.todoService.addToDo(text);
      this.taskName = '';
    }
  }
}
