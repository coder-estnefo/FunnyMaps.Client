import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorModel } from 'src/app/interfaces/error-model';
import { AuthService, Token } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  title: 'Register' | 'Login' = 'Login';
  error!: ErrorModel | undefined;
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
        this.title = 'Login';
      },
      error: (error: ErrorModel) => {
        this.isLoading = false;
        this.error = error;
      },
    });
  }

  private login() {
    this.isLoading = true;
    const { email, password } = this.authForm.value;
    this.auth.login(email!, password!).subscribe({
      next: (token) => {
        this.isLoading = false;
        this.authForm.reset();
        this.auth.storeToken(token);
        this.router.navigate(['/funny-map']).then(() => {
          this.isLoading = false;
        });
      },
      error: (error: ErrorModel) => {
        this.isLoading = false;
        this.error = error;
      },
    });
  }

  onSubmit() {
    this.error = undefined;
    this.isLoading = true;
    if (this.authForm.valid && this.title == 'Register') {
      this.register();
    }

    if (this.authForm.valid && this.title == 'Login') {
      this.login();
    }
  }

  goToLogin() {
    this.error = undefined;
    this.isLoading = false;
    this.authForm.reset();
    this.title = 'Login';
  }

  goToRegister() {
    this.error = undefined;
    this.isLoading = false;
    this.authForm.reset();
    this.title = 'Register';
  }
}
