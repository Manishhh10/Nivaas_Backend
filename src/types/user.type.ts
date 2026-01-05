export interface IUser {
  email: string;
  password: string;
  role: 'user' | 'admin';
}
