import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicApiService } from '../../../services/academic-api.service';
import { AsyncPipe } from '@angular/common';
import { map, switchMap } from 'rxjs';
import { CreateTaskPayload, TaskView } from '../../../models/task.model';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './task-edit.page.html',
})
export class TaskEditPage {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(AcademicApiService);
  private readonly router = inject(Router);

  // Guardamos la tarea original
  originalTask!: TaskView;

  readonly form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  readonly task$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) => this.api.getTaskById(id))
  );

  constructor() {
    this.task$.subscribe((task) => {
      this.originalTask = task;

      this.form.patchValue({
        title: task.title,
        description: task.description,
      });
    });
  }

  updateTask() {
    if (this.form.invalid) return;

    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Construimos el payload respetando los valores originales
    const payload: CreateTaskPayload = {
      title: this.form.value.title!,
      description: this.form.value.description!,
      status: this.originalTask.status,          // ✔ se mantiene
      priority: this.originalTask.priorityLabel.startsWith('Alta')
        ? 'high'
        : this.originalTask.priorityLabel.startsWith('Media')
        ? 'medium'
        : 'low',                                 // ✔ se mantiene
      student_id: this.originalTask.studentLabel === 'Sin estudiante asignado'
        ? 1
        : this.originalTask.id,                  // ✔ se mantiene
      due_date: this.originalTask.dueDateLabel === 'Sin fecha'
        ? ''
        : new Date(this.originalTask.dueDateLabel).toISOString(), // ✔ se mantiene
    };

    this.api.updateTask(id, payload).subscribe(() => {
      this.router.navigate(['/tasks', id]);
    });
  }
}
