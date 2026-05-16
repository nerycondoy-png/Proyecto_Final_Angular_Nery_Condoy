import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AcademicApiService } from '../../services/academic-api.service';
import { TaskDraftStorageService } from '../../services/task-draft-storage.service';
import { CreateTaskPayload } from '../../models/task.model';

interface TaskForm {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<'low' | 'medium' | 'high'>;
  due_date: FormControl<string | null>;
  student_id: FormControl<number | null>;
  subtasks: FormArray<FormControl<string>>;
}

@Component({
  selector: 'app-forms-page',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe], // ReactiveForms + JsonPipe
  templateUrl: './forms.page.html', // enlazado al HTML
})
export class FormsPage {
  /*
   * Objetivo del ejercicio:
   * Practicar formularios reactivos con FormGroup, FormControl y FormArray.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Agregar Validators.minLength(3) al titulo.
   *
   * Actividad 2, nivel intermedio:
   * - Construir un CreateTaskPayload usando los valores del formulario.
   *
   * Actividad 3, nivel intermedio:
   * - Enviar el formulario al backend usando AcademicApiService.createTask().
   *
   * Actividad 4, nivel reto:
   * - Guardar mas campos como borrador en localStorage y restaurarlos al recargar.
   *
   * Criterio de aceptacion:
   * - Si el formulario es invalido, no debe hacer POST.
   * - Si el POST funciona, debe limpiar el formulario o mostrar la tarea creada.
   * - El payload debe respetar los nombres del backend: student_id y due_date.
   */
  private readonly api = inject(AcademicApiService);
  private readonly draftStorage = inject(TaskDraftStorageService);
  readonly message = signal<string | null>(null);
  private readonly draft = this.draftStorage.loadDraft() ?? {};

  readonly taskForm = new FormGroup<TaskForm>({
    title: new FormControl(this.draft.title ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)], // ✅ minLength agregado
    }),
    description: new FormControl(this.draft.description ?? '', {
      nonNullable: true,
    }),
    priority: new FormControl(this.draft.priority ?? 'medium', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    due_date: new FormControl(this.draft.due_date ?? null),
    student_id: new FormControl(this.draft.student_id ?? null),
    subtasks: new FormArray<FormControl<string>>([]),
  });

  constructor() {
    if (this.draft.subtasks) {
      this.draft.subtasks.forEach((s: string) =>
        this.subtasks.push(
          new FormControl(s, { nonNullable: true, validators: [Validators.required] }),
        ),
      );
    }
  }

  get subtasks(): FormArray<FormControl<string>> {
    return this.taskForm.controls.subtasks;
  }

  addSubtask(): void {
    this.subtasks.push(
      new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    );
  }

  removeSubtask(index: number): void {
    this.subtasks.removeAt(index);
  }

  saveDraft(): void {
    this.draftStorage.saveDraft(this.taskForm.getRawValue());
    this.message.set('Borrador guardado');
  }

  submit(): void {
    this.taskForm.markAllAsTouched();

    // Validación previa del student_id
    const value = this.taskForm.getRawValue();
    if (!value.student_id || value.student_id <= 0) {
      this.message.set('Debes ingresar un ID de estudiante válido');
      return;
    }

    if (this.taskForm.invalid) {
      this.message.set('Formulario inválido');
      return;
    }

    const payload: CreateTaskPayload = {
      title: value.title,
      description: value.description,
      priority: value.priority,
      status: 'pending',
      student_id: value.student_id ?? 1,
      due_date: value.due_date ?? '',
    };

    this.api.createTask(payload).subscribe({
      next: (task) => {
        this.message.set(`Tarea creada: ${task.title}`);
        this.taskForm.reset();
        this.subtasks.clear();
        this.draftStorage.clearDraft();
      },
      error: (err) => {
        // Mostrar mensaje exacto del backend
        if (err.error?.message) {
          this.message.set(`Error: ${err.error.message}`);
        } else {
          this.message.set('Error creando la tarea');
        }
        console.error('Error creando la tarea:', err);
      },
    });

    /*
     * TODO estudiante:
     * Aqui debe construir CreateTaskPayload y llamar AcademicApiService.createTask().
     * Por ahora solo se muestra el valor en consola para no resolver todo el ejercicio.
     *
     * Pasos sugeridos:
     * 1. Leer const value = this.taskForm.getRawValue().
     * 2. Crear un objeto CreateTaskPayload.
     * 3. Pasar description como null si esta vacia.
     * 4. Llamar al servicio.
     * 5. Manejar next y error en subscribe.
     */
    console.log('Formulario valido:', this.taskForm.getRawValue());
  }
}
