import { TestBed } from "@angular/core/testing";
import { BookService } from "./book.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ApiService } from "./api.service";
import { BookPayload, BookResponse } from "../types/book.types";
import { of } from "rxjs";

describe('BookService', () => {
  let service: BookService;
  let apiMock: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        BookService,
        ApiService
      ]
    });

    service = TestBed.inject(BookService);
    apiMock = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('search', () => {
    it('should call API with query', () => {
      const query = 'test';

      vi.spyOn(apiMock, 'get').mockReturnValue(of<BookResponse[]>([]));

      service.search(query)
        .subscribe(response => {
          expect(response).toBeTruthy();
        });

      expect(apiMock.get).toHaveBeenCalledWith('/books/search', { q: 'test' });
      expect(apiMock.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should call API to create a book', () => {
      const bookPayload: BookPayload = {
        isbn: '1234567890',
        title: 'New Book',
        authors: ['Author'],
        description: 'A new book',
        thumbnail: 'http://example.com/thumbnail.jpg',
        status: 'DESEADO'
      };
      const mockResponse: BookResponse = {
        id: 1,
        ownerId: 'user123',
        isLent: false,
        isbn: '1234567890',
        title: 'New Book',
        authors: ['Author'],
        description: 'A new book',
        thumbnail: 'http://example.com/thumbnail.jpg',
        status: 'DESEADO'
      };

      vi.spyOn(apiMock, 'post').mockReturnValue(of(mockResponse));

      service.create(bookPayload)
        .subscribe(response => {
          expect(response).toEqual(mockResponse);
        });

      expect(apiMock.post).toHaveBeenCalledWith('/books', bookPayload);
      expect(apiMock.post).toHaveBeenCalledTimes(1);
    });
  });

});
