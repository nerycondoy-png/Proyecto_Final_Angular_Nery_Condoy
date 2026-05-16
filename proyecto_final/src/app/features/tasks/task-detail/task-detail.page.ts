/*
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicApiService } from '../../../services/academic-api.service';
import { TaskView } from '../../../models/task.model';


@Component({
  selector: 'app-task-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.page.html',
})
export class TaskDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(AcademicApiService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly task = signal<TaskView | null>(null);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.error.set('ID inválido');
      this.loading.set(false);
      return;
    }

    this.api.getTaskById(id).subscribe({
      next: (task) => {
        this.task.set(task);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la tarea');
        this.loading.set(false);

        // NUEVO: redirección si no existe
        this.router.navigate(['/tasks'], {
          queryParams: { error: 'not-found' },
        });
      },
    });
  }
}
*/

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskStore } from '../../../core/state/task-store';
import { TaskView } from '../../../models/task.model';


@Component({
  selector: 'app-task-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-detail.page.html',
})
export class TaskDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(TaskStore);

  /*
   * CORRECCIÓN:
   * Antes: signal(null) → Angular lo trataba como NEVER.
   * Ahora: signal<TaskView | null>(null)
   */
  readonly task = signal<TaskView | null>(null);

  constructor() {
    // Obtener ID desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Buscar tarea en el store global
    const found = this.store.getById(id);

    if (!found) {
      /*
       * Redirección si la tarea no existe
       * Esto evita errores en el template.
       */
      this.router.navigate(['/tasks'], {
        queryParams: { error: 'not-found' },
      });
      return;
    }

    // Guardar tarea encontrada
    this.task.set(found);
  }
}
