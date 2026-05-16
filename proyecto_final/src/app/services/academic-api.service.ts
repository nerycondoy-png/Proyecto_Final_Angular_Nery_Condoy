import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, Observable } from 'rxjs';
import { API_BASE_URL } from '../core/constants/api.constants';

import {
  mapCategoryApiToView,
  mapProductApiToView,
  mapStudentApiToView,
  mapTaskApiToView,
} from '../mappers/academic.mappers';

import { ApiResponse } from '../models/api-response.model';
import { CategoryApi, CategoryView } from '../models/category.model';
import { ProductApi, ProductView } from '../models/product.model';
import { CreateStudentPayload, StudentApi, StudentView } from '../models/student.model';
import { CreateTaskPayload, TaskApi, TaskView } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class AcademicApiService {
  constructor(private http: HttpClient) {}

  /*
   * Objetivo del servicio:
   * Consumir el backend REST con HttpClient y devolver Observables tipados.
   *
   * Conceptos que evalua:
   * - inject() en lugar de constructor.
   * - Observable<T>.
   * - pipe(), map() y tap().
   * - Remapeo API -> ViewModel usando mappers.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Agregar tap() en getStudents() para observar la respuesta cruda.
   *
   * Actividad 2, nivel intermedio:
   * - Completar transformaciones marcadas como TODO en los mappers.
   *
   * Actividad 3, nivel intermedio:
   * - Implementar createTask() correctamente.
   *
   * Actividad 4, nivel reto:
   * - Crear createStudent() y getTaskById(id).
   *
   * Importante:
   * Este servicio esta intencionalmente incompleto en algunos puntos para que
   * el estudiante practique. No todo debe estar resuelto desde el inicio.
   *
   * Criterio de aceptacion:
   * - Ningun metodo debe devolver any.
   * - Todo endpoint debe usar ApiResponse<T>.
   * - Todo dato mostrado en HTML debe pasar por un ViewModel o mapper.
   */

  getCategories(): Observable<CategoryView[]> {
    return this.http.get<ApiResponse<CategoryApi[]>>(`${API_BASE_URL}/categories`).pipe(
      tap((res) => console.log('Categories RAW:', res)),
      map((res) => res.data.map(mapCategoryApiToView)),
    );
  }


      /*
       * TODO estudiante:
       * Revisa mapProductApiToView().
       * El metodo HTTP ya funciona, pero el mapper deja campos incompletos a proposito.
       */
      

getProducts(): Observable<ProductView[]> {
    return this.http.get<ApiResponse<ProductApi[]>>(`${API_BASE_URL}/products`).pipe(
      tap((res) => console.log('Products RAW:', res)),
      map((res) => res.data.map(mapProductApiToView)),
    );
  }
  
      /*
       * TODO estudiante:
       * Agrega tap() aqui para inspeccionar la respuesta cruda, igual que en products.
       *
       * Criterio de aceptacion:
       * - Debe imprimirse en consola una sola vez por carga.
       * - No debe modificar response.data.
       *
       * Pista:
       * tap((response) => console.log('Respuesta cruda students:', response))
       */
     

  getStudents(): Observable<StudentView[]> {
    return this.http.get<ApiResponse<StudentApi[]>>(`${API_BASE_URL}/students`).pipe(
      tap((res) => console.log('Students RAW:', res)),
      map((res) => res.data.map(mapStudentApiToView)),
    );
  }

  getStudentById(id: number): Observable<StudentView> {
    return this.http.get<ApiResponse<StudentApi>>(`${API_BASE_URL}/students/${id}`).pipe(
      tap((res) => console.log('StudentById RAW:', res)),
      map((res) => mapStudentApiToView(res.data)),
    );
  }


 createStudent(payload: CreateStudentPayload): Observable<StudentView> {
    return this.http
      .post<ApiResponse<StudentApi>>(`${API_BASE_URL}/students`, payload)
      .pipe(
        tap((res) => console.log('CreateStudent RAW:', res)),
        map((res) => mapStudentApiToView(res.data)),
      );
  }

  updateStudent(
    id: number,
    payload: { firstName: string; lastName: string; email: string; active: boolean },
  ): Observable<StudentView> {
    const body: CreateStudentPayload = {
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      active: payload.active,
    };

    return this.http
      .put<ApiResponse<StudentApi>>(`${API_BASE_URL}/students/${id}`, body)
      .pipe(
        tap((res) => console.log('UpdateStudent RAW:', res)),
        map((res) => mapStudentApiToView(res.data)),
      );
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/students/${id}`).pipe(
      tap(() => console.log(`Estudiante ${id} eliminado correctamente.`))
    );
  }

  //getTasks(): Observable<TaskView[]> {
  //return this.http.get<ApiResponse<TaskApi[]>>(`${API_BASE_URL}/tasks`).pipe(
  //tap((response) => console.log('Respuesta cruda tasks:', response)),
  /*
   * TODO estudiante:
   * El mapper de tasks deja dueDateLabel parcialmente resuelto.
   * Completa esa transformacion antes de usar la fecha en una pantalla real.
   */

  getTasks(): Observable<TaskView[]> {
    return this.http.get<ApiResponse<TaskApi[]>>(`${API_BASE_URL}/tasks`).pipe(
      tap((res) => console.log('Tasks RAW:', res)),
      map((res) => res.data.map(mapTaskApiToView)),
    );
  }

  //createTask(payload: CreateTaskPayload): Observable<TaskView> {
  /*
   * TODO estudiante:
   * Implementar este POST.
   *
   * Pasos esperados:
   * 1. Usar this.http.post<ApiResponse<TaskApi>>(`${API_BASE_URL}/tasks`, payload)
   * 2. Encadenar .pipe(...)
   * 3. Agregar tap((response) => console.log(response))
   * 4. Agregar map((response) => mapTaskApiToView(response.data))
   * 5. Conectar este metodo desde /formularios.
   *
   * Resultado esperado:
   * El formulario de /formularios podra crear una tarea real en el backend.
   *
   * Criterio de aceptacion:
   * - Si el backend responde 201, la pantalla debe mostrar la tarea creada
   *   o limpiar el formulario.
   * - Si el backend responde 400, el estudiante debe poder identificar
   *   que payload se envio mal mirando la consola o el mensaje visual.
   *
   * Nota:
   * Se usa void payload para que TypeScript no marque el parametro como no usado
   * mientras el metodo queda como ejercicio pendiente.
   */
  //void payload;
  //return throwError(() => new Error('TODO estudiante: implementar POST /api/tasks'));
  //}

  // CAMBIO 2: createTask implementado
  /*
  createTask(payload: CreateTaskPayload): Observable<TaskView> {
    return this.http
      .post<ApiResponse<TaskApi>>(`${API_BASE_URL}/tasks`, payload)
      .pipe(
        tap((response) => console.log('Respuesta cruda createTask:', response)),
        map((response) => mapTaskApiToView(response.data)),
      );
  }
*/
  // Obtener todas las tareas
  //getTasks(): Observable<TaskView[]> {
  //return this.http.get<TaskView[]>('/api/tasks');
  //}

  // NUEVO: obtener una tarea por ID
  getTaskById(id: number): Observable<TaskView> {
    return this.http.get<ApiResponse<TaskApi>>(`${API_BASE_URL}/tasks/${id}`).pipe(
      tap((res) => console.log('TaskById RAW:', res)),
      map((res) => mapTaskApiToView(res.data)),
    );
  }

  // Crear tarea
  createTask(payload: CreateTaskPayload): Observable<TaskView> {
    return this.http.post<ApiResponse<TaskApi>>(`${API_BASE_URL}/tasks`, payload).pipe(
      tap((res) => console.log('CreateTask RAW:', res)),
      map((res) => mapTaskApiToView(res.data)),
    );
  }

  // Actualizar tarea
 updateTask(id: number, payload: CreateTaskPayload): Observable<TaskView> {
    return this.http.put<ApiResponse<TaskApi>>(`${API_BASE_URL}/tasks/${id}`, payload).pipe(
      tap((res) => console.log('UpdateTask RAW:', res)),
      map((res) => mapTaskApiToView(res.data)),
    );
  }

  // Eliminar tarea (lo usaremos después)
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/tasks/${id}`).pipe(
      tap(() => console.log(`Tarea ${id} eliminada correctamente.`))
    );
  }

  /*
   * TODO estudiante:
   * Crear metodo createStudent().
   *
   * Nivel: reto.
   *
   * Pistas:
   * - Primero crea CreateStudentPayload en student.model.ts.
   * - Luego usa POST /api/students.
   * - Finalmente aplica mapStudentApiToView al response.data.
   *
   * Criterio de aceptacion:
   * - El metodo debe retornar Observable<StudentView>.
   * - El payload debe usar los nombres que espera el backend: first_name,
   *   last_name, email y active.
   */
 
}
