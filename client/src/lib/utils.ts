import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiUrl() {
  if (import.meta.env.PROD)
    return `https://${process.env.VITE_API_ENDPOINT}/api/v1`;

  return 'http://localhost:3000/api/v1';
}
