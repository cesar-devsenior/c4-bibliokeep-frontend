import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly api: ApiService) {}

  login(payload: LoginRequest) {
    return this.api.post<AuthResponse>('/auth/login', payload);
  }

  register(payload: RegisterRequest) {
    return this.api.post<AuthResponse>('/auth/register', payload);
  }

  refreshToken(refreshToken: string) {
    return this.api.post<AuthResponse>('/auth/refresh', { refreshToken });
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
  }

  saveSession(auth: AuthResponse) {
    localStorage.setItem('accessToken', auth.accessToken);
    localStorage.setItem('refreshToken', auth.refreshToken);
    localStorage.setItem('userEmail', auth.email);
  }

  get token(): string | null {
    return localStorage.getItem('accessToken');
  }
}
