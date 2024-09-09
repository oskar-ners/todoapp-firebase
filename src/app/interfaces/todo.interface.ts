import { Timestamp } from '@angular/fire/firestore';

export interface TodoInterface {
  task: string;
  deadlineDate: Timestamp;
  priority: string;
  isCompleted: boolean;
  isEditing: boolean;
}
