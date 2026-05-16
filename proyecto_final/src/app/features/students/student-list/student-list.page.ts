import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AcademicApiService } from '../../../services/academic-api.service';
import { StudentView } from '../../../models/student.model';

@Component({
  selector: 'app-student-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-list.page.html',
})
export class StudentListPage {
  private readonly api = inject(AcademicApiService);
  private readonly router = inject(Router);

  students: StudentView[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit() {
    this.loadStudents();

    // recarga automática cada vez que se navega a /students
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        if (e.urlAfterRedirects.startsWith('/students')) {
          this.loadStudents();
        }
      });
  }

  private loadStudents() {
    this.loading = true;
    this.api.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar estudiantes';
        this.loading = false;
      },
    });
  }

  delete(id: number) {
    const ok = confirm('¿Seguro que deseas eliminar este estudiante?');
    if (!ok) return;

    this.api.deleteStudent(id).subscribe({
      next: () => {
        // refresca la lista en memoria inmediatamente
        this.students = this.students.filter((s) => s.id !== id);
        console.log(`Estudiante ${id} eliminado y lista actualizada.`);
      },
      error: () => {
        this.errorMessage = 'Error al eliminar estudiante';
      },
    });
  }
}
