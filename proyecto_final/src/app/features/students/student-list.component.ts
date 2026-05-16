import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush // ✅ optimización
})
export class StudentListComponent {
  students = [
    { id: 1, name: 'Nery' },
    { id: 2, name: 'Willam' },
    { id: 3, name: 'Ana' },
  ];

  trackById(index: number, student: any): number {
    return student.id; // ✅ evita renderizado innecesario
  }
}
