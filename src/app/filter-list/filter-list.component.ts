import { Component, Input } from '@angular/core';
import { TodoInterface } from '../interfaces/todo.interface';

@Component({
  selector: 'app-filter-list',
  standalone: true,
  imports: [],
  templateUrl: './filter-list.component.html',
})
export class FilterListComponent {
  @Input({ required: true }) toDoList!: TodoInterface[];

  filterList(): void {
    this.toDoList.map((todo) => {});
  }
}
