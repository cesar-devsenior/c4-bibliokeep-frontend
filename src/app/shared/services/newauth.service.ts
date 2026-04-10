import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth.types";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root'})
export class NewAuthService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'http://localhost:8080/api/auth';

    login(payload: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, payload);
    }

    register(payload: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/register`, payload);
    }
}