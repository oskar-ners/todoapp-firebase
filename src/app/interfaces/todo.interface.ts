import { Timestamp } from '@angular/fire/firestore';

export interface TodoInterface {
  task: string;
  date: Timestamp;
  isCompleted: boolean;
  isEditing: boolean;
}
