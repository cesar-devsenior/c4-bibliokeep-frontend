import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth.types";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root'})
export class NewAuthService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.backendUrl}/api/auth`;

    login(payload: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, payload);
    }

    register(payload: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/register`, payload);
    }
}