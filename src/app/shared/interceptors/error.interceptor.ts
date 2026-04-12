import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { setAppError } from '../stores/ui.store';

export const errorInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return next(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || 'Error en la comunicación con el servidor';
        console.error(message);
        setAppError(message);
        return throwError(() => error);
      })
    );
};
