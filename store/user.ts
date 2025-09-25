import { defineStore } from 'pinia';
import type { User } from '@/types';


export const useUserStore = defineStore('user', {
  state: (): { users: User[]; user: User | null } => ({
    users: [],
    user: null,
  }),
  getters: {
    isLogged(): boolean {
      return !!this.user;
    },
  },
  actions: {
    setUsers(u: User[]) {
      this.users = u;
    },
    setUser(u: User | null) {
      this.user = u;
    },
    addUser(u: User) {
      this.users.push(u);
    },
    updateUser(updated: User) {
      const idx = this.users.findIndex((x) => x.id === updated.id);
      if (idx !== -1) this.users.splice(idx, 1, updated);
    },
    removeUser(id: number) {
      this.users = this.users.filter((x) => x.id !== id);
    },
    clear() {
      this.user = null;
    },
  },
});