import { TestBed } from '@angular/core/testing';
import { FileService } from './file.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('FileService', () => {
  let service: FileService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        FileService
      ]
    });

    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('upload', () => {
    it('should upload a file', () => {
      const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
      const mockResponse = {
        filename: 'test.txt',
        url: 'http://example.com/test.txt',
        size: 123
      };

      service.upload(mockFile)
        .subscribe(response => {
          expect(response.filename).toBe('test.txt');
          expect(response.url).toBe('http://example.com/test.txt');
          expect(response.size).toBe(123);
        });

      const req = httpTesting.expectOne(`${environment.backendUrl}/api/file/upload`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body.get('file')).toBe(mockFile);
      req.flush(mockResponse);
    });

    it('should handle upload errors', () => {
      const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });

      service.upload(mockFile)
        .subscribe({
          error: (error) => {
            expect(error.status).toBe(500);
          }
        });

      const req = httpTesting.expectOne(`${environment.backendUrl}/api/file/upload`);
      req.flush(null, { status: 500, statusText: 'Server Error' });
    });
  });
});
