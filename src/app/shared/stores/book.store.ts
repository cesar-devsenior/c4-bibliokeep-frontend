import { computed, signal } from '@angular/core';
import { BookResponse } from '../types/book.types';

export const bookListSignal = signal<BookResponse[]>([]);
export const bookFilterSignal = signal('');
export const bookLoadingSignal = signal(false);

export const filteredBooks = computed(() => {
  const query = bookFilterSignal().trim().toLowerCase();
  if (!query) {
    return bookListSignal();
  }
  return bookListSignal().filter((book) => {
    const title = book.title.toLowerCase();
    const author = book.authors.join(' ').toLowerCase();
    return title.includes(query) || author.includes(query) || book.isbn.includes(query);
  });
});

export const setBooks = (books: BookResponse[]) => bookListSignal.set(books);
export const setFilter = (filter: string) => bookFilterSignal.set(filter);
export const setLoadingBooks = (value: boolean) => bookLoadingSignal.set(value);
