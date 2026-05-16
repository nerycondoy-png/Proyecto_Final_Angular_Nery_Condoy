import { Routes } from '@angular/router';
import { StudentListComponent } from './student-list.component';
import { StudentSignalComponent } from './student-signal.component';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    title: 'Lista de Estudiantes',
    component: StudentListComponent,
  },
  {
    path: 'signal',
    title: 'Lista con Signals',
    component: StudentSignalComponent,
  },
];
