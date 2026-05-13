import { BookListComponent } from "./book-list.component";

describe("BookListComponent", () => {
    let component: BookListComponent;

    beforeEach(() => {
        component = new BookListComponent();
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

});