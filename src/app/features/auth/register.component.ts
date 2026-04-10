import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { setAuth } from '../../shared/stores/auth.store';
import { NewAuthService } from '../../shared/services/newauth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(NewAuthService);
  private readonly router = inject(Router);

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    preferences: ['', [Validators.required]],
    annualGoal: [0, [Validators.required, Validators.min(0)]]
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const raw = this.form.value;
    const payload = {
      email: raw.email ?? '',
      password: raw.password ?? '',
      preferences: (raw.preferences ?? '').split(',').map((item: string) => item.trim()).filter(Boolean),
      annualGoal: raw.annualGoal ?? 0
    };

    this.authService.register(payload)
      .subscribe({
        next: (auth) => {
          setAuth(auth);
          this.router.navigateByUrl('/dashboard');
        },
        error: () => {}
      });

    // this.authService.register(payload).subscribe({
    //   next: (auth) => {
    //     this.authService.saveSession(auth);
    //     setAuth(auth);
    //     this.router.navigate(['/dashboard']);
    //   },
    //   error: () => {
    //     // error handled globally
    //   },
    // });
  }
}
