// src/stores/user.ts
import { defineStore } from 'pinia';
import type { User } from '../types';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isLogged: (state) => !!state.user,
  },
  actions: {
    setUser(u: User | null) {
      this.user = u;
    },
    clear() {
      this.user = null;
    },
  },
});
