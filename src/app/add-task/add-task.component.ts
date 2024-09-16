import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['../to-do-app/to-do-app.component.scss'],
})
export class AddTaskComponent {
  todoService = inject(TodoService);

  taskName: string | null = '';
  priority: string = '';
  deadlineDate!: Date;

  addTask(text: string | null, priority: string, date: Date, form: NgForm) {
    if (this.taskName?.length === 0 || this.taskName === null) return;
    else {
      const deadlineTimestamp = Timestamp.fromDate(new Date(date));
      this.todoService.addToDo(text, priority, deadlineTimestamp);
      form.resetForm();
    }
  }
}
