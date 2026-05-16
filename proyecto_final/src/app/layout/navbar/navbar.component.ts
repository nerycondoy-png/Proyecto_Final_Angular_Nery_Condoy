import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLoggedIn = (this.auth as any).isLoggedInSignal;
  /*
   * Objetivo del componente:
   * Mostrar las secciones principales de la SPA.
   *
   * Que debe completar el estudiante:
   * Si agrega una pagina nueva en app.routes.ts, tambien debe agregarla aqui.
   *
   * Pista:
   * routerLinkActive aplica una clase CSS cuando la ruta esta activa.
   */
   readonly navItems: NavItem[] = [
    { label: 'Inicio', path: '/', icon: 'IN' },
    { label: 'Interpolacion', path: 'interpolacion', icon: 'IT' },
    { label: 'Componentes', path: 'componentes', icon: 'CP' },
    { label: 'Control Flow', path: 'control-flow', icon: 'CF' },
    { label: 'Servicios HTTP', path: 'servicios-http', icon: 'API' },
    { label: 'Rutas', path: 'rutas', icon: 'RT' },
    { label: 'Formularios', path: 'formularios', icon: 'FG' },
    { label: 'Local Storage', path: 'local-storage', icon: 'LS' },
    { label: 'Tareas', path: 'tasks', icon: 'TK' },
    { label: 'Estudiantes', path: 'students', icon: 'ST' },
  ];

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    (this.auth as any).logout();
    this.router.navigate(['/login']);
  }
}