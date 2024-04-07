const API_BASE_URL = "https://api.spotify.com/v1";

export const getTracksFromPlaylist = async (currentPlaylistId) => {
  const accessToken = localStorage.getItem("access_token");
  const data = await fetch(
    API_BASE_URL + `/playlists/${currentPlaylistId}/tracks`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  const tracks = await data.json();
  return tracks.items;
};