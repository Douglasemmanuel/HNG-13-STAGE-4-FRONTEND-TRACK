import { create } from 'zustand';

interface User {
  id?: string;         // ✅ Simple string id (e.g. Clerk user ID)
  avatar?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

interface UserStore {
  currentUser: User;
  isAuthenticated: boolean;
  setCurrentUser: (user: Partial<User>) => void;
  clearCurrentUser: () => void;
  setAuthenticated: (value: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: {
    id: undefined,
    avatar: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
  },

  isAuthenticated: false,

  // ✅ Set or update the current user
  setCurrentUser: (userData) =>
    set((state) => ({
      currentUser: { ...state.currentUser, ...userData },
      isAuthenticated: true,
    })),

  // ✅ Clear user when logging out
  clearCurrentUser: () =>
    set(() => ({
      currentUser: {
        id: undefined,
        avatar: undefined,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
      },
      isAuthenticated: false,
    })),

  // ✅ Manually control auth state
  setAuthenticated: (value: boolean) => set(() => ({ isAuthenticated: value })),
}));
