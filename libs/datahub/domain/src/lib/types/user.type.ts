export interface User {
  id: number;
  userName: string;
  email: string;
  description?: string;
  imageUrl?: string;
}

export interface CreateUserDto {
  userName: string;
  email: string;
  description?: string;
  imageUrl?: string;
}