import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { UploadResponse } from "../types/file.types";

@Injectable({ providedIn: "root" })
export class FileService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.backendUrl}/api/file`;

  upload(file: File | Blob): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post<UploadResponse>(`${this.base}/upload`, formData);
  }

  async optimizeImage(file: File, maxWidth = 800): Promise<Blob> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(new Blob([file]));
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const scale = maxWidth / img.width;

          const canvas = document.createElement('canvas');
          canvas.width = maxWidth;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => resolve(blob!), 'image/webp', 0.8);
        }
      };
    });

  }
}