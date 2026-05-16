import { Pipe, PipeTransform } from '@angular/core';

/*
 * Objetivo del pipe:
 * Capitalizar la primera letra de un texto.
 *
 * Cambios realizados:
 * Manejo de null/undefined.
 * Comentarios explicativos.
 */

@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}