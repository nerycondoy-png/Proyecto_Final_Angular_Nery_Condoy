import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStore } from '../../../core/state/task-store';
import { Router } from '@angular/router';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { StatusColorPipe } from '../../../shared/pipes/status-color.pipe';
import { PriorityIconPipe } from '../../../shared/pipes/priority-icon.pipe';

/*
 * Objetivo del archivo:
 * - Mostrar listado de tareas usando el store global.
 * - Filtrar tareas por estado.
 * - Navegar al detalle de una tarea.
 *
 * Cambios realizados:
 * Se reemplazó AcademicApiService por TaskStore.
 * Se corrigió loading y error para que NO sean llamados como funciones.
 * Se agregó filtro con signal.
 * Se agregaron comentarios explicativos.
 */

@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [
    CommonModule,
    CapitalizePipe,
    TruncatePipe,
    StatusColorPipe,
    PriorityIconPipe,
    // Si luego usas pipes personalizados, los agregas aquí:
    // StatusColorPipe,
    // CapitalizePipe,
    // PriorityIconPipe,
    // TruncatePipe,
  ],
  templateUrl: './task-list.page.html',
})
export class TaskListPage {
  private readonly store = inject(TaskStore);
  private readonly router = inject(Router);

  // NUEVO: filtro local
  readonly filter = signal<'all' | 'pending' | 'done'>('all');

  /*
   * CORRECCIÓN IMPORTANTE:
   * loading y error ya NO son signals aquí.
   * Son getters que devuelven el valor del store.
   * Por eso en el HTML se usan como "loading" y no "loading()".
   */
  get loading() {
    return this.store.loading();
  }

  get error() {
    return this.store.error();
  }

  // Acceso directo a las tareas ordenadas del store
  get tasks() {
    return this.store.sortedTasks();
  }

  // NUEVO: tareas filtradas
  get filteredTasks() {
    const filter = this.filter();
    const tasks = this.tasks;

    if (filter === 'all') return tasks;
    return tasks.filter((t) => t.status === filter);
  }

  // Cambiar filtro desde botones
  filterByStatus(status: 'all' | 'pending' | 'done') {
    this.filter.set(status);
  }

  // Navegación programática
  goToDetail(id: number) {
    this.router.navigate(['/tasks', id]);
  }
}
