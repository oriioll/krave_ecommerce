export interface User {
  id?: number;
  email: string;
  pwd?: string;  // Optional - only required when creating a user
  name: string;
  role_id?: number;
  role?: string;
}
