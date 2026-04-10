import { computed, signal } from '@angular/core';
import { AuthResponse } from '../types/auth.types';

const initialUser = null as AuthResponse | null;

export const authSignal = signal<AuthResponse | null>(initialUser);
export const isAuthenticatedSignal = computed(() => !!authSignal()?.accessToken);

export const setAuth = (auth: AuthResponse | null) => {
  authSignal.set(auth);

  if (auth) {
    localStorage.setItem('accessToken', auth.accessToken);
    localStorage.setItem('refreshToken', auth.refreshToken ?? 'asd');
    localStorage.setItem('userEmail', auth.email);
  }
};

export const hydrateAuthFromStorage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const email = localStorage.getItem('userEmail');

  if (accessToken && refreshToken && email) {
    setAuth({
      accessToken,
      refreshToken,
      userId: '',
      email,
    } as AuthResponse);
  }
};
