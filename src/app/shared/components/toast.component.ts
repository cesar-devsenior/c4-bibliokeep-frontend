import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  private toastService = inject(ToastService);

  toasts = this.toastService.toasts;
  remove = this.toastService.remove.bind(this.toastService);

  getClasses(type: string): string {
    const baseClasses = 'flex items-center justify-between px-4 py-3 rounded-lg shadow-lg transition-all duration-300 max-w-sm w-full';
    switch (type) {
      case 'success':
        return `${baseClasses} bg-gradient-to-r from-green-400 to-green-500 text-white`;
      case 'error':
        return `${baseClasses} bg-gradient-to-r from-red-400 to-red-500 text-white`;
      case 'info':
      default:
        return `${baseClasses} bg-gradient-to-r from-blue-400 to-blue-500 text-white`;
    }
  }
}