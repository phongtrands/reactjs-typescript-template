import { CreateUserDto } from "../types/user.type";

export async function createUser(data: CreateUserDto): Promise<void> {
  return fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
    if (!res.ok) throw new Error('Create failed');
  });
}