import { clsx, type ClassValue } from 'clsx';

import { twMerge } from 'tailwind-merge';

import { UserType } from '@/types/user-type';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiUrl() {
  if (import.meta.env.PROD)
    return `https://${process.env.VITE_API_ENDPOINT}/api/v1`;

  return 'http://localhost:3000/api/v1';
}

export function getUserName(user: UserType | null) {
  if (user) {
    if (user.firstName && user.lastName)
      return `${user.firstName} ${user.lastName}`;

    return user.email;
  }

  return 'Profile';
}
