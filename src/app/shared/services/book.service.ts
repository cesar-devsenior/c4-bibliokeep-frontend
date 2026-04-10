import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BookPayload, BookResponse } from '../types/book.types';

@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(private readonly api: ApiService) {}

  search(query: string) {
    const params = query ? { q: query } : {};
    return this.api.get<BookResponse[]>('/books/search', params);
  }

  create(book: BookPayload) {
    return this.api.post<BookResponse>('/books', book);
  }

  updateStatus(id: number, status: BookPayload['status']) {
    return this.api.patch<BookResponse>(`/books/${id}/status`, { status });
  }
}
