import { Pipe, PipeTransform } from '@angular/core';

/*
 * Objetivo del pipe:
 * Acortar textos largos.
 *
 * Cambios realizados:
 * Se agregó parámetro length.
 * Manejo de textos cortos.
 * Comentarios explicativos.
 */

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number = 40): string {
    if (!value) return '';
    if (value.length <= length) return value;
    return value.slice(0, length) + '...';
  }
}