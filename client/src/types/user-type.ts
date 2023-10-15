export type UserType = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: 'user' | 'admin';
};
