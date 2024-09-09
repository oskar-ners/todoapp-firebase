import { Injectable, inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import {
  CollectionReference,
  Firestore,
  Timestamp,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TodoInterface } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);

  addToDo(text: string): void {
    if (this.firebaseAuth.currentUser) {
      const uid = this.firebaseAuth.currentUser?.uid;

      const todosCollection = collection(this.firestore, 'users', uid, 'todos');

      addDoc(todosCollection, {
        task: text,
        isCompleted: false,
      })
        .then(() => {
          console.log('Task added');
        })
        .catch((error) => {
          console.log('Error ' + error.message);
        });
    }
  }

  async editToDo(toDoId: number, editedTaskName: string): Promise<void> {
    if (this.firebaseAuth.currentUser) {
      const uid = this.firebaseAuth.currentUser.uid;
      const todosCollection = collection(this.firestore, 'users', uid, 'todos');
      const todosDocs = await getDocs(todosCollection);
      const todoDocsIds = todosDocs.docs.map((doc) => doc.id);

      if (editedTaskName.length > 0) {
        await updateDoc(doc(todosCollection, todoDocsIds[toDoId]), {
          task: editedTaskName,
        });
      }
    }
  }

  async removeToDo(toDoId: number): Promise<void> {
    if (this.firebaseAuth.currentUser) {
      const uid = this.firebaseAuth.currentUser?.uid;
      const todosCollection = collection(this.firestore, 'users', uid, 'todos');
      const todosDocs = await getDocs(todosCollection);
      const todoIds = todosDocs.docs.map((document) => document.id);

      await deleteDoc(doc(todosCollection, todoIds[toDoId]));
      console.log(`Task with ID ${todoIds[toDoId]} removed`);
    }
  }

  async toDoDone(toDoId: number): Promise<void> {
    if (!this.firebaseAuth.currentUser) return;

    const uid = this.firebaseAuth.currentUser.uid;
    const todosCollection = collection(this.firestore, 'users', uid, 'todos');

    const todoDocsIds = (await getDocs(todosCollection)).docs.map(
      (doc) => doc.id
    );
    const todoDocRef = doc(todosCollection, todoDocsIds[toDoId]);

    const todoDocSnapshot = await getDoc(todoDocRef);
    if (todoDocSnapshot.exists()) {
      const isCompleted = todoDocSnapshot.data()['isCompleted'];
      await updateDoc(todoDocRef, { isCompleted: !isCompleted });
    }
  }

  getTodos(): Observable<TodoInterface[]> | null {
    return new Observable((observer) => {
      onAuthStateChanged(this.firebaseAuth, (user) => {
        if (user) {
          const uid = user.uid;
          const todosCollection = collection(
            this.firestore,
            'users',
            uid,
            'todos'
          ) as CollectionReference<TodoInterface>;
          collectionData(todosCollection).subscribe(
            (todos) => {
              const todoList: TodoInterface[] = [];
              todos.forEach((todo) => {
                todoList.push(todo);
              });
              observer.next(todoList);
            },
            (error) => {
              observer.error(error);
            }
          );
        } else {
          observer.error('No user is logged in');
        }
      });
    });
  }
}
