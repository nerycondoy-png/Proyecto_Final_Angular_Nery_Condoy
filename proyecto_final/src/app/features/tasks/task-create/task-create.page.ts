import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AcademicApiService } from '../../../services/academic-api.service';
import { CreateTaskPayload } from '../../../models/task.model';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-create.page.html',
})
export class TaskCreatePage {
  private readonly api = inject(AcademicApiService);
  private readonly router = inject(Router);

  readonly form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  createTask() {
    if (this.form.invalid) return;

    const payload: CreateTaskPayload = {
    title: this.form.value.title!,
    description: this.form.value.description!,
    status: 'pending',        // ✔ ahora coincide con TaskStatus
    priority: 'medium',
    student_id: 1,
    due_date: new Date().toISOString(),
    };

    this.api.createTask(payload).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}
