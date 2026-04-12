import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);

  get toasts() {
    return this.toastsSignal.asReadonly();
  }

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = Date.now();
    const toast: Toast = { id, message, type };
    this.toastsSignal.update(toasts => [...toasts, toast]);

    // Auto-remove after 5 seconds
    setTimeout(() => this.remove(id), 5000);
  }

  remove(id: number) {
    this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
  }
}