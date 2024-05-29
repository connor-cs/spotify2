import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem("access_token"),
  selectedTrack: {
    trackUri: "",
    id: "",
    trackName: "",
    artist: "",
    image: "",
  },
  userProfilePic: "",
  selectedPlaylist: {
    playlistId: "",
    playlistTracks: [],
  },
  searchType: "",
  login: (token) => {
    localStorage.setItem("access_token", token);
    set({ isAuthenticated: true, accessToken: token });
  },
  logout: () => {
    localStorage.removeItem("access_token");
    set({ isAuthenticated: false, accessToken: null });
  },
  isAccessTokenExpired() {
    const expirationTime = localStorage.getItem("access_token_expires_at");
    if (!expirationTime) return true;

    const currentTime = new Date().getTime();
    return currentTime > parseInt(expirationTime, 10);
  },
  setUserProfilePic: (profPicUrl: string) => {
    set(() => ({
      userProfilePic: profPicUrl,
    }));
  },
  setSelectedTrack: (
    newTrackUri: string,
    trackId: string,
    trackName: string,
    artistName: string,
    trackImage: string
  ) => {
    set(() => ({
      selectedTrack: {
        trackUri: newTrackUri,
        id: trackId,
        trackName: trackName,
        artist: artistName,
        image: trackImage,
      },
    }));
  },
  setSelectedPlaylist: (updates) =>
    set((state) => ({
      selectedPlaylist: { ...state.selectedPlaylist, ...updates },
    })),
  setCurrentPlaylistTrackList: (tracksArray: Array) =>
    set(() => ({
      selectedPlaylistTrackList: tracksArray.map(
        (track: object) => track.track["uri"]
      ),
    })),
  setSearchType: (searchType: string) =>
    set(() => ({
      searchType: searchType
    }))
}));

export default useAuthStore;
