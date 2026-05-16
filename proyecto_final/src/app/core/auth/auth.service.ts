import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage.service';

const AUTH_KEY = 'academic-auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storage = new LocalStorageService();

  // Signal para saber si el usuario está logueado
  readonly isLoggedInSignal = signal<boolean>(this.hasSession());

  private hasSession(): boolean {
    return this.storage.getItem<boolean>(AUTH_KEY, false);
  }

  login(email: string, password: string): boolean {
    // Simulación de login real
    if (email === 'admin@demo.com' && password === '123456') {
      this.storage.setItem(AUTH_KEY, true);
      this.isLoggedInSignal.set(true);
      return true;
    }

    return false;
  }

  logout(): void {
    this.storage.removeItem(AUTH_KEY);
    this.isLoggedInSignal.set(false);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSignal();
  }
}
