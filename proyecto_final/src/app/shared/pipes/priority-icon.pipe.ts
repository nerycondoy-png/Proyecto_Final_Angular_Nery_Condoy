import { Pipe, PipeTransform } from '@angular/core';

/*
 * Objetivo del pipe:
 * Convertir prioridad en un ícono visual.
 *
 * Cambios realizados:
 * Se agregaron íconos para high, medium y low.
 * Comentarios explicativos.
 */

@Pipe({
  name: 'priorityIcon',
  standalone: true
})
export class PriorityIconPipe implements PipeTransform {
  transform(priority: string): string {
    const map: Record<string, string> = {
      high: '🔥',
      medium: '⚠️',
      low: '💤',
    };
    return map[priority] ?? '❓';
  }
}