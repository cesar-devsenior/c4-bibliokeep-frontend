import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../shared/services/book.service';
import { ToastService } from '../../shared/services/toast.service';
import { BookPayload, BookStatus } from '../../shared/types/book.types';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
})
export class BookFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly bookService = inject(BookService);
  private readonly toastService = inject(ToastService);

  bookStatuses: BookStatus[] = ['DESEADO', 'COMPRADO', 'LEYENDO', 'LEIDO', 'ABANDONADO'];

  bookForm = this.fb.group({
    isbn: ['', [Validators.required, Validators.pattern(/^\d{10}(\d{3})?$/)]],
    title: ['', Validators.required],
    authors: this.fb.array([this.fb.control('', Validators.required)]),
    description: [''],
    thumbnail: [''],
    status: ['DESEADO' as BookStatus, Validators.required],
    rating: [null as number | null],
  });

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  addAuthor() {
    this.authors.push(this.fb.control('', Validators.required));
  }

  removeAuthor(index: number) {
    if (this.authors.length > 1) {
      this.authors.removeAt(index);
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const book: BookPayload = {
        ...this.bookForm.value,
        authors: this.authors.value.filter((a: string) => a.trim()),
        rating: this.bookForm.value.rating || undefined,
      } as BookPayload;

      this.bookService.create(book).subscribe({
        next: () => {
          this.toastService.show('Libro agregado exitosamente', 'success');
          this.router.navigate(['/books']);
        },
        error: (err) => {
          console.error('Error creating book:', err);
          this.toastService.show('Error al agregar el libro. Inténtalo de nuevo.', 'error');
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/books']);
  }
}