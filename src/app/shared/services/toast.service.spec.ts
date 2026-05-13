import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    service = new ToastService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show', () => {
    it('should add a toast when show is called', () => {
      service.show('Test message', 'success');

      const toasts = service.toasts();
      expect(toasts.length).toBe(1);
      expect(toasts[0].message).toBe('Test message');
      expect(toasts[0].type).toBe('success');
    });

    it('should display several toasts', () => {
      service.show('First message', 'info');
      service.show('Second message', 'error');

      const toasts = service.toasts();
      expect(toasts.length).toBe(2);
      expect(toasts[0].message).toBe('First message');
      expect(toasts[1].message).toBe('Second message');
    });

    it('should auto-remove toast after 5 seconds', async () => {
      service.show('Auto-remove test', 'info');

      await sleep(5000);

      const updatedToasts = service.toasts();
      expect(updatedToasts.length).toBe(0);
    }, 6000);

  });

  describe('remove', () => {

    it('should remove a toast by id', () => {
      service.show('Toast to remove', 'error');
      const toasts = service.toasts();
      const toastId = toasts[0].id;

      service.remove(toastId);

      const updatedToasts = service.toasts();
      expect(updatedToasts.length).toBe(0);
    });

    it('should not remove other toasts when one is removed', async () => {
      service.show('First toast', 'info');
      await sleep(100); // Ensure different timestamps for unique IDs
      service.show('Second toast', 'success');
      await sleep(100);
      service.show('Third toast', 'error');
      const toasts = service.toasts();
      const firstToastId = toasts[0].id;

      service.remove(firstToastId);

      const updatedToasts = service.toasts();
      expect(updatedToasts.length).toBe(2);
      expect(updatedToasts[0].message).toBe('Second toast');
      expect(updatedToasts[1].message).toBe('Third toast');
    }, 5000);

  });

});

const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
