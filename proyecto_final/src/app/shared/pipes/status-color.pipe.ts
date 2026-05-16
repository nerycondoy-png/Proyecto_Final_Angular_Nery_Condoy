import { Pipe, PipeTransform } from '@angular/core';

/*
 * Objetivo del pipe:
 * Convertir un estado de tarea en un color CSS.
 *
 * Cambios realizados:
 * Se agregaron colores para pending, in_progress y done.
 * Se agregaron comentarios explicativos.
 */

@Pipe({
  name: 'statusColor',
  standalone: true,
})
export class StatusColorPipe implements PipeTransform {
  transform(status: string): string {
    const map: Record<string, string> = {
      pending: '#d97706',      // naranja
      in_progress: '#2563eb',  // azul
      done: '#16a34a',         // verde
    };

    return map[status] ?? '#6b7280'; // gris por defecto
  }
}
