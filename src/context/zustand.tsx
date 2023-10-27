import { create } from "zustand";

//use this:
// spotify-sdk:ClientCredentialsStrategy:token
// or this?
// access_token



const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem('access_token'),
  accessToken: localStorage.getItem('access_token'),
  login: (token) => {
    localStorage.setItem('access_token', token);
    set({ isAuthenticated: true, accessToken: token });
  },
  logout: () => {
    localStorage.removeItem('access_token');
    set({ isAuthenticated: false, accessToken: null });
  },
}));

export default useAuthStore;