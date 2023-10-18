import { clsx, type ClassValue } from 'clsx';

import { twMerge } from 'tailwind-merge';

import { UserType } from '@/schemas/user-schemas';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiUrl() {
  if (import.meta.env.PROD && import.meta.env.VITE_API_ENDPOINT !== 'localhost')
    return `https://${import.meta.env.VITE_API_ENDPOINT}/api/v1`;
  if (import.meta.env.PROD)
    return `http://${import.meta.env.VITE_API_ENDPOINT}/api/v1`;
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

export function formatDate(date: Date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDay = day.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  const formattedDate = `${formattedDay} ${month} ${year} ${formattedHours}:${formattedMinutes}`;

  return formattedDate;
}
