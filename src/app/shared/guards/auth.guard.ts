import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isAuthenticatedSignal } from '../stores/auth.store';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (!isAuthenticatedSignal()) {
    router.navigate(['/auth/login']);
    return false;
  }
  
  return true;
};

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (isAuthenticatedSignal()) {
    router.navigateByUrl('/dashboard');
    return false;
  }
  
  return true;
};
