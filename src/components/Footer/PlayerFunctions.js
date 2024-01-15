export const getTracksFromPlaylist = async (id, accessToken) => {
  
  const data = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`,
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  })
  const tracks = await data.json()
  return tracks.items
}