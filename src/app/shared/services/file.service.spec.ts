import { FileService } from './file.service';

describe('FileService', () => {
    let service: FileService;

    beforeEach(() => {
        service = new FileService();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});