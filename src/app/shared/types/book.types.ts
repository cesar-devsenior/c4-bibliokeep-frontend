export type BookStatus = 'DESEADO' | 'COMPRADO' | 'LEYENDO' | 'LEIDO' | 'ABANDONADO';

export interface BookPayload {
  isbn: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
  status: BookStatus;
  rating?: number;
}

export interface BookResponse extends BookPayload {
  id: number;
  ownerId: string;
  isLent: boolean;
}
