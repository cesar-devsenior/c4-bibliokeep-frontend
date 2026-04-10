import { signal } from '@angular/core';

export const appLoadingSignal = signal(false);
export const appErrorSignal = signal<string | null>(null);

export const setAppLoading = (isLoading: boolean) => appLoadingSignal.set(isLoading);
export const setAppError = (message: string | null) => appErrorSignal.set(message);
