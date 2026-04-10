import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { authSignal, isAuthenticatedSignal } from '../shared/stores/auth.store';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = authSignal;
  isAuthenticated = isAuthenticatedSignal;

  logout() {
    this.authService.logout();
    this.user.set(null);
    this.router.navigate(['/auth/login']);
  }
}
