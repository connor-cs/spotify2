import { create } from "zustand";

//use this:
// spotify-sdk:ClientCredentialsStrategy:token
// or this?
// access_token
//
//
const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("access_token"),
  accessToken: localStorage.getItem("access_token"),
  currentTrack: {
    currentTrackUri: "",
    id: "",
    trackName: "",
    artist: "",
    image: "",
  },
  login: (token) => {
    localStorage.setItem("access_token", token);
    set({ isAuthenticated: true, accessToken: token });
  },
  logout: () => {
    localStorage.removeItem("access_token");
    set({ isAuthenticated: false, accessToken: null });
  },
  setCurrentTrack: (
    newTrackUri: string,
    trackId: string,
    trackName: string,
    artistName: string,
    trackImage: string
  ) => {
    set((currentTrack) => ({
      currentTrack: {
        currentTrackUri: newTrackUri,
        id: trackId,
        trackName: trackName,
        artist: artistName,
        image: trackImage,
      },
    }));
  },
}));

export default useAuthStore;
