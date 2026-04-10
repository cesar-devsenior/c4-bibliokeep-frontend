import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { setAuth } from '../../shared/stores/auth.store';
import { NewAuthService } from '../../shared/services/newauth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(NewAuthService);
  private readonly router = inject(Router);

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const value = this.form.value;
    const payload = {
      email: value.email ?? '',
      password: value.password ?? '',
    };
    this.authService.login(payload)
      .subscribe({
        next: (auth) => {
          // this.authService.saveSession(auth);
          setAuth(auth);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          // error handled globally
        },
      });
  }
}
