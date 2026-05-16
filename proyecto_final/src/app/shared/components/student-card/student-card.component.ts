import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-student-card',
  standalone: true,
  templateUrl: './student-card.component.html',
})
export class StudentCardComponent {
  /*
   * Objetivo del componente:
   * Practicar comunicacion padre -> hijo con input() y hijo -> padre con output().
   *
   * Que debe completar el estudiante:
   * Actividad:
   * - Agregar un segundo output para "eliminar" o "desactivar" estudiante.
   *
   * Criterio de aceptacion:
   * - El output debe emitir StudentView.
   * - El componente hijo no debe conocer ni modificar el array del padre.
   *
   * Pista:
   * readonly removeRequested = output<StudentView>();
   */

  @Input({ required: true }) student!: {
    id: number;
    fullName: string;
    email: string;
    active: boolean;
    activeLabel: string;
  };

  @Output() selected = new EventEmitter<any>();
  @Output() removeRequested = new EventEmitter<any>();

  select() {
    this.selected.emit(this.student);
  }

  remove() {
    this.removeRequested.emit(this.student);
  }
}