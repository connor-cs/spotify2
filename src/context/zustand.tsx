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
  selectedTrack: {
    trackUri: "",
    id: "",
    trackName: "",
    artist: "",
    image: "",
  },
  selectedPlaylistId: "",
  selectedPlaylistTrackList: [],
  currentlyPlayingTrackUris: [],
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
    set(() => ({
      selectedTrack: {
        trackUri: newTrackUri,
        id: trackId,
        trackName: trackName,
        artist: artistName,
        image: trackImage,
      },
    }))
  },
  setCurrentPlaylist: (playlistId: string) =>
    set(() => ({
      selectedPlaylistId: playlistId,
    })),
  setCurrentPlaylistTrackList: (tracksArray: Array) =>
    set(() => ({
     selectedPlaylistTrackList: tracksArray.map(
        (track: object) => track.track["uri"]
      ),
    })),
    setcurrentlyPlayingTrackUris: (uris: Array) => 
    set(() => ({
      currentlyPlayingTrackUris: uris
    }))
}));

export default useAuthStore;
