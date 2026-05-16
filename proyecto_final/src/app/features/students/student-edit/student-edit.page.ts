import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AcademicApiService } from '../../../services/academic-api.service';
import { StudentView } from '../../../models/student.model';

@Component({
  selector: 'app-student-edit-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-edit.page.html',
})
export class StudentEditPage implements OnInit {
  private readonly api = inject(AcademicApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef); // ✅ fuerza actualización visual

  form = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    active: new FormControl(true, { nonNullable: true }),
  });

  studentId!: number;
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido:', this.studentId);

    this.api.getStudentById(this.studentId).subscribe({
      next: (student: StudentView) => {
        console.log('Estudiante cargado:', student);
        this.form.patchValue({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          active: student.active,
        });
        this.loading = false;
        this.cdr.detectChanges(); // ✅ actualiza la vista inmediatamente
      },
      error: (err) => {
        console.error('Error al cargar estudiante:', err);
        this.errorMessage = 'Error al cargar estudiante';
        this.loading = false;
        this.cdr.detectChanges(); // ✅ asegura que se muestre el mensaje
      },
    });
  }

  save(): void {
    if (this.form.invalid) return;

    const payload = this.form.value as {
      firstName: string;
      lastName: string;
      email: string;
      active: boolean;
    };

    this.api.updateStudent(this.studentId, payload).subscribe({
      next: () => {
        console.log('Estudiante actualizado correctamente.');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/students']); // recarga garantizada
        });
      },
      error: (err) => {
        console.error('Error al actualizar estudiante:', err);
        this.errorMessage = 'Error al actualizar estudiante';
        this.cdr.detectChanges();
      },
    });
    this.router.navigate(['/students'], { replaceUrl: true });
  }
}
