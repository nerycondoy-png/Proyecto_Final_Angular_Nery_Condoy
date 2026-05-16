import { Injectable, signal, computed, inject } from '@angular/core';
import { AcademicApiService } from '../../services/academic-api.service';
import { TaskView } from '../../models/task.model';

/*
 * Objetivo del archivo:
 * - Crear un estado global para tareas usando signals.
 * - Evitar recargar tareas en cada página.
 * - Compartir estado entre TaskList y TaskDetail.
 *
 * Cambios realizados:
 * ✔ Se agregó lista global de tareas.
 * ✔ Se agregó estado loading/error.
 * ✔ Se agregó método refresh() para recargar tareas.
 * ✔ Se agregó método getById() para obtener una tarea del store.
 * ✔ Se agregaron comentarios explicativos.
 */

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private readonly api = inject(AcademicApiService);

  // NUEVO: estado global
  readonly tasks = signal<TaskView[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  // NUEVO: tareas ordenadas (ejemplo de computed)
  readonly sortedTasks = computed(() =>
    [...this.tasks()].sort((a, b) => a.title.localeCompare(b.title))
  );

  constructor() {
    // Cargar tareas al iniciar la app
    this.refresh();
  }

  /*
   * NUEVO:
   * Recargar tareas desde backend.
   * Se usa en TaskList y TaskDetail.
   */
  refresh(): void {
    this.loading.set(true);
    this.error.set(null);

    this.api.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las tareas');
        this.loading.set(false);
      },
    });
  }

  /*
   * NUEVO:
   * Obtener una tarea por ID desde el store.
   * Si no existe, se devuelve null.
   */
  getById(id: number): TaskView | null {
    return this.tasks().find((t) => t.id === id) ?? null;
  }
}
