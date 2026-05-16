import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-signal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Lista con Signals</h2>
    <ul>
      <li *ngFor="let student of students(); trackBy: trackById">
        {{ student.name }}
      </li>
    </ul>
    <button (click)="addStudent()">Agregar estudiante</button>
  `
})
export class StudentSignalComponent {
  students = signal([{ id: 1, name: 'Nery' }]);

  addStudent() {
    this.students.update(list => [...list, { id: list.length + 1, name: 'Nuevo' }]);
  }

  trackById(index: number, student: any): number {
    return student.id;
  }
}
