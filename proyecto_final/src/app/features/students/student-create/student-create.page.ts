import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AcademicApiService } from '../../../services/academic-api.service';

@Component({
  selector: 'app-student-create-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-create.page.html',
})
export class StudentCreatePage {
  private readonly api = inject(AcademicApiService);
  private readonly router = inject(Router);

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

  errorMessage = '';

  save(): void {
    if (this.form.invalid) return;

    const payload = this.form.value as {
      firstName: string;
      lastName: string;
      email: string;
      active: boolean;
    };

    this.api
      .createStudent({
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        active: payload.active,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/students'], { replaceUrl: true }); // fuerza recarga
        },
        error: () => {
          this.errorMessage = 'Error al crear estudiante';
        },
      });
      this.router.navigate(['/students'], { replaceUrl: true });
  }
}
