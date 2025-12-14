export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
}

