import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BookListComponent } from "./book-list.component";
import { BookService } from "../../shared/services/book.service";
import { of } from "rxjs";
import { BookResponse } from "../../shared/types/book.types";
import { Router } from "@angular/router";

describe('BookListComponent', () => {
    let component: BookListComponent;
    let fixture: ComponentFixture<BookListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BookListComponent],
            providers: [BookService, Router]
        }).compileComponents();

        fixture = TestBed.createComponent(BookListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Verify title is shown', () => {
        const compiled = fixture.nativeElement as HTMLElement;

        expect(compiled.querySelector('h2')?.textContent).toContain('Mis Libros');
    });

    describe('loadBooks', () => {
        it('should call loadBooks on refresh button click', () => {
            vi.spyOn(component, 'loadBooks');

            const compiled = fixture.nativeElement as HTMLElement;
            const refreshButton = compiled.querySelector('#refresh-books') as HTMLButtonElement;

            refreshButton.click();

            expect(component.loadBooks).toHaveBeenCalled();
        });

        it('should call loadBooks and load books', async () => {
            const bookService = TestBed.inject(BookService);
            const mockBooks: BookResponse[] = [
                { id: 1, title: 'Test Book 1', authors: ['Author 1'], status: 'DESEADO', isLent: false, isbn: '123', ownerId: 'user1', description: '', thumbnail: '' },
                { id: 2, title: 'Test Book 2', authors: ['Author 2'], status: 'LEIDO', isLent: false, isbn: '456', ownerId: 'user2', description: '', thumbnail: '' }
            ];
            component.filter.set('test');

            vi.spyOn(bookService, 'search').mockReturnValue(of(mockBooks));

            component.loadBooks();

            TestBed.tick();

            expect(bookService.search).toHaveBeenCalledWith('test');
            expect(component.filtered()).toEqual(mockBooks);
        });
    });

    describe('navigateToAddBook', () => {
        it('should navigate to add book page on button click', () => {
            const router = TestBed.inject(Router);

            vi.spyOn(router, 'navigate');

            component.navigateToAddBook();

            expect(router.navigate).toHaveBeenCalledWith(['/books/add']);
        });
    });

});