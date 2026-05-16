import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, signal} from '@angular/core';
import { Observable } from 'rxjs';
import { AcademicApiService } from '../../services/academic-api.service';
import { CategoryView } from '../../models/category.model';
import { ProductView } from '../../models/product.model';
import { TaskView } from '../../models/task.model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-http-services-page',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './http-services.page.html',
})
export class HttpServicesPage {
  /*
   * Objetivo del ejercicio:
   * Consumir el backend real con HttpClient y Observables.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Identificar que variables terminan con $ porque son Observables.
   *
   * Actividad 2, nivel intermedio:
   * - Agregar manejo visual de error con catchError.
   *
   * Actividad 3, nivel intermedio:
   * - Completar los mappers para que no se muestren textos "TODO".
   *
   * Actividad 4, nivel reto:
   * - Crear un boton que haga POST de una tarea.
   *
   * Criterio de aceptacion:
   * - No suscribirse manualmente si async pipe es suficiente.
   * - Usar subscribe solo para acciones imperativas como POST.
   * - Mostrar al usuario si el backend no esta disponible.
   */
  private readonly academicApi = inject(AcademicApiService);
  // CAMBIO 1: signal para error visual
  readonly error = signal<string | null>(null);

  //readonly categories$: Observable<CategoryView[]> = this.academicApi.getCategories();
  //readonly products$: Observable<ProductView[]> = this.academicApi.getProducts();
  //readonly tasks$: Observable<TaskView[]> = this.academicApi.getTasks();

  // CAMBIO 2: catchError agregado
  readonly categories$: Observable<CategoryView[]> = this.academicApi.getCategories().pipe(
    catchError(() => {
      this.error.set('Error cargando categorías');
      return of([]);
    }),
  );

  readonly products$: Observable<ProductView[]> = this.academicApi.getProducts().pipe(
    catchError(() => {
      this.error.set('Error cargando productos');
      return of([]);
    }),
  );

  readonly tasks$: Observable<TaskView[]> = this.academicApi.getTasks().pipe(
    catchError(() => {
      this.error.set('Error cargando tareas');
      return of([]);
    }),
  );

  readonly exampleJson = {
    endpoint: '/api/tasks',
    method: 'GET',
    topic: 'json',
  };
}
