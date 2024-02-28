import { create } from "zustand";

//use this:
// spotify-sdk:ClientCredentialsStrategy:token
// or this?
// access_token
//
//
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
  selectedPlaylistId: "",
  //track uris from the selected playlist:
  selectedPlaylistTrackList: [],
  //uris from selected playlist or from selected individual song:
  currentlyPlayingTrackUris: [],
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
    return currentTime > parseInt(expirationTime);
  },
  setUserProfilePic: (profPicUrl: string) => {
    set(() => ({
      userProfilePic: profPicUrl
    }))
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
    }));
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
  setCurrentlyPlayingTrackUris: (uris: Array) =>
    set(() => ({
      currentlyPlayingTrackUris: uris,
    })),
}));

export default useAuthStore;
