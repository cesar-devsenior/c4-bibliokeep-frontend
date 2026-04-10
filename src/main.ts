import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { hydrateAuthFromStorage } from './app/shared/stores/auth.store';

// Initialize dark mode
const isDark = localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && globalThis.matchMedia('(prefers-color-scheme: dark)').matches);
if (isDark) {
  document.documentElement.classList.add('dark');
}

// Hydrate auth from localStorage
hydrateAuthFromStorage();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
