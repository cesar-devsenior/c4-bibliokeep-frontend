import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './shared/guards/auth.guard';

//Lazy Loading
export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [loginGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register.component').then((m) => m.RegisterComponent)
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent)
      },
      {
        path: 'books',
        children: [
          {
            path: '',
            loadComponent: () => import('./features/books/book-list.component').then((m) => m.BookListComponent)
          },
          {
            path: 'add',
            loadComponent: () => import('./features/books/book-form.component').then((m) => m.BookFormComponent)
          },
        ],
      },
      {
        path: 'loans',
        loadComponent: () => import('./features/loans/loan-list.component').then((m) => m.LoanListComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];
