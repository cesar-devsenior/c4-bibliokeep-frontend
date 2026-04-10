import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bookFilterSignal, bookListSignal, bookLoadingSignal, filteredBooks, setBooks, setFilter, setLoadingBooks } from '../../shared/stores/book.store';
import { BookService } from '../../shared/services/book.service';
import { authGuard } from '../../shared/guards/auth.guard';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  private bookService = inject(BookService);

  loading = bookLoadingSignal;
  filter = bookFilterSignal;
  filtered = filteredBooks;

  setFilter = setFilter;

  loadBooks() {
    setLoadingBooks(true);
    this.bookService.search(this.filter()).subscribe({
      next: (list) => {
        setBooks(list);
      },
      error: () => {},
      complete: () => setLoadingBooks(false),
    });
  }
}
