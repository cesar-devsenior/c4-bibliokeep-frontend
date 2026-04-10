import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor = (req:HttpRequest<unknown>, next: HttpHandlerFn) => {
    const auth = inject(AuthService);

    const token = auth.token;
    if (!token) {
      return next(req);
    }

    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next(cloned);
};

