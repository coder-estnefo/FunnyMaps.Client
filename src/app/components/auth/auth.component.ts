import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export default interface AuthError {
  Email?: string[];
  Password?: string[];
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  tittle: 'Register' | 'Login' = 'Register';
  error = '';
  errors: AuthError = {};
  isLoading = false;

  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  authForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  private register() {
    this.isLoading = true;
    const { email, password } = this.authForm.value;
    this.auth.register(email!, password!).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.authForm.reset();
        this.tittle = 'Login';
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;

        if (typeof error.error === 'string') {
          this.error = error.error;
        }

        if (error.error?.['errors']) {
          this.errors = error.error['errors'];
        }
      },
      complete: () => {},
    });
  }

  private login() {
    this.isLoading = true;
    const { email, password } = this.authForm.value;
    this.auth.login(email!, password!).subscribe({
      next: (response) => {
        this.authForm.reset();
        this.router.navigate(['/funny-map']).then(() => {
          this.isLoading = false;
        });
      },
      error: (error) => {
        this.isLoading = false;
      },
      complete: () => {},
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.authForm.valid && this.tittle == 'Register') {
      this.register();
    }

    if (this.authForm.valid && this.tittle == 'Login') {
      this.login();
    }
  }

  goToLogin() {
    this.tittle = 'Login';
  }

  goToRegister() {
    this.tittle = 'Register';
  }
}
