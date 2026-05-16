import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  errorMessage = '';

  login() {
    if (this.form.invalid) {
      this.errorMessage = 'Completa todos los campos';
      return;
    }

    const email = this.form.value.email!;
    const password = this.form.value.password!;

    const ok = this.auth.login(email, password);

    if (ok) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Credenciales incorrectas';
    }
  }
}
