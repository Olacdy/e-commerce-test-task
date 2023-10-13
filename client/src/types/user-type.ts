export type UserType = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: 'user' | 'admin';
};
