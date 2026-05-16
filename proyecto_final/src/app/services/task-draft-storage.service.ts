import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../core/storage/local-storage.service';

export interface TaskDraft {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  student_id: number | null;
  subtasks: string[];
}

const TASK_DRAFT_KEY = 'academic-task-draft';

@Injectable({ providedIn: 'root' })
export class TaskDraftStorageService {
  /*
   * Objetivo del servicio:
   * Persistir un borrador pequeno para practicar localStorage.
   *
   * Que debe completar el estudiante:
   * Guardar mas campos del formulario, por ejemplo priority o due_date.
   */
  private readonly storage = inject(LocalStorageService);

  loadDraft(): TaskDraft {
    return this.storage.getItem<TaskDraft>(TASK_DRAFT_KEY, {
      title: '',
      description: '',
      priority: 'medium',     // agregado
      due_date: null,         // agregado
      student_id: null,       // agregado
      subtasks: [],           // agregado
    });
  }

  saveDraft(draft: TaskDraft): void {
    this.storage.setItem(TASK_DRAFT_KEY, draft);
  }

  clearDraft(): void {
    this.storage.removeItem(TASK_DRAFT_KEY);
  }
}
