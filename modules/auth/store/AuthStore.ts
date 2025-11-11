import { create } from 'zustand';

interface User {
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
    avatar: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
  },

  isAuthenticated: false,

  // Update user data (partial allows updating only some fields)
  setCurrentUser: (userData) =>
    set((state) => ({
      currentUser: { ...state.currentUser, ...userData },
      isAuthenticated: true, // user is now logged in
    })),

  // Clear all user data and set isAuthenticated to false
  clearCurrentUser: () =>
    set(() => ({
      currentUser: {
        avatar: undefined,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
      },
      isAuthenticated: false,
    })),

  // Optional: manually set authentication state
  setAuthenticated: (value: boolean) => set(() => ({ isAuthenticated: value })),
}));
