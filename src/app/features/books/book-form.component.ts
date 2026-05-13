import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../shared/services/book.service';
import { ToastService } from '../../shared/services/toast.service';
import { BookPayload, BookStatus } from '../../shared/types/book.types';
import { FileService } from '../../shared/services/file.service';
import { environment } from '../../../environments/environment';

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
  private readonly fileService = inject(FileService);
  private readonly toastService = inject(ToastService);

  private readonly selectedFile = signal<File | null>(null);

  bookStatuses: BookStatus[] = ['DESEADO', 'COMPRADO', 'LEYENDO', 'LEIDO', 'ABANDONADO'];

  bookForm = this.fb.group({
    isbn: ['', [Validators.required, Validators.pattern(/^\d{10}(\d{3})?$/)]],
    title: ['', Validators.required],
    authors: this.fb.array([this.fb.control('', Validators.required)]),
    description: [''],
    status: ['DESEADO' as BookStatus, Validators.required],
    rating: [null as number | null],
  });

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  onSelectFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile.set(input.files[0]);
      alert(this.selectedFile()?.name);
    }
  }

  addAuthor() {
    this.authors.push(this.fb.control('', Validators.required));
  }

  removeAuthor(index: number) {
    if (this.authors.length > 1) {
      this.authors.removeAt(index);
    }
  }

  async onSubmit() {
    if (this.bookForm.valid) {
      let book: BookPayload = {
        ...this.bookForm.value,
        authors: this.authors.value.filter((a: string) => a.trim()),
        rating: this.bookForm.value.rating || undefined,
      } as BookPayload;

      if (this.selectedFile()) {
        this.uploadFileRaw(book);
      } else {
        this.createBook(book);
      }
    }
  }

  private uploadFileRaw(book: BookPayload) {
    this.fileService.upload(this.selectedFile()!)
      .subscribe({
        next: resp => {
          book = {
            ...book,
            thumbnail: `${environment.backendUrl}${resp.url}`
          };

          this.createBook(book);
        },
        error: error => {
          console.log("Error al enviar el archivo al backend");
          this.toastService.show('Error al enviar el archivo al backend.', 'error');
        }
      });
  }

  private async uploadFileOptimized(book: BookPayload) {
    const blob = await this.fileService.optimizeImage(this.selectedFile()!);

    this.fileService.upload(blob)
      .subscribe({
        next: resp => {
          book = {
            ...book,
            thumbnail: `${environment.backendUrl}${resp.url}`
          } as BookPayload;

          this.createBook(book);
        },
        error: error => {
          console.log("Error al enviar el archivo al backend");
          this.toastService.show('Error al enviar el archivo al backend.', 'error');
        }
      });
  }

  private createBook(book: BookPayload) {
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

  cancel() {
    this.router.navigate(['/books']);
  }
}