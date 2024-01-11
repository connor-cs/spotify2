export const getTracksFromPlaylist = async (uri) => {
  const accessToken = localStorage.getItem("access_token");
  await fetch(`https://api.spotify.com/v1/playlists/${uri}/tracks`),
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  }
}