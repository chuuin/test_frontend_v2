import { get, post, put, del } from './api';
import type { User } from '@/types';

export const getUsers = () => get<User[]>('/users');
export const createUser = (user: Partial<User>) => post<User, Partial<User>>('/users', user);
export const updateUser = (id: number, user: Partial<User>) => put<User, Partial<User>>(`/users/${id}`, user);
export const deleteUser = (id: number) => del(`/users/${id}`);
