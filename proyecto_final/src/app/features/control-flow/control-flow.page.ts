import { Component, signal } from '@angular/core';
import { TaskView } from '../../models/task.model';
import { CommonModule } from '@angular/common';

type DemoState = 'loading' | 'empty' | 'error' | 'ready';
interface DemoTask {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'done';
}

@Component({
  selector: 'app-control-flow-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-flow.page.html',
})
export class ControlFlowPage {
  /*
   * Objetivo del ejercicio:
   * Practicar @if y @for sin usar *ngIf ni *ngFor.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Cambiar el estado desde botones.
   *
   * Actividad 2, nivel intermedio:
   * - Agregar una signal para filtrar tareas por estado.
   *
   * Actividad 3, nivel reto:
   * - Mostrar un mensaje diferente cuando el filtro no tiene resultados.
   *
   * Criterio de aceptacion:
   * - Usar @if y @for, no *ngIf ni *ngFor.
   * - Usar track task.id.
   * - No mutar directamente el array de tasks.
   *
   * Pista:
   * En modo zoneless, signal ayuda a actualizar la vista de forma explicita.
   */

  readonly state = signal<DemoState>('ready');

  /*
  readonly tasks = signal<TaskView[]>([
    {
      id: 1,
      title: 'Configurar proyecto Angular',
      description: 'Crear rutas principales.',
      status: 'done',
      statusLabel: 'Terminada',
      priorityLabel: 'Alta',
      studentLabel: 'Ana Mora',
      dueDateLabel: '02/05/2026',
    },
    {
      id: 2,
      title: 'Crear formulario reactivo',
      description: 'Practicar FormGroup y FormArray.',
      status: 'pending',
      statusLabel: 'Pendiente',
      priorityLabel: 'Media',
      studentLabel: 'Sin estudiante asignado',
      dueDateLabel: 'Sin fecha',
    },
  ]);
*/
  readonly tasks: DemoTask[] = [
    {
      id: 1,
      title: 'Practicar FormGroup',
      description: 'Aprender a usar FormArray y validaciones.',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Consumir API de estudiantes',
      description: 'Usar HttpClient y mapear datos.',
      status: 'in_progress',
    },
    {
      id: 3,
      title: 'Crear vista detalle',
      description: 'Implementar routing con parámetros.',
      status: 'done',
    },
  ];

  //NUEVO: filtro
  readonly filter = signal<'all' | 'pending' | 'done'>('all');

  setState(state: DemoState): void {
    this.state.set(state);
  }

  setFilter(value: 'all' | 'pending' | 'done'): void {
    this.filter.set(value);
  }

  // NUEVO: tareas filtradas
  get filteredTasks(): DemoTask[] {
    const filter = this.filter();
    const tasks = this.tasks;

    if (filter === 'all') return tasks;
    return tasks.filter((t) => t.status === filter);
  }
}
