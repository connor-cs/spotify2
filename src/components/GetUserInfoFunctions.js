

export async function getTopTracks() {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
      Authorization: "Bearer " + accessToken
    }
  })
  const data = await response.json()
  // console.log('top tracks:', data.items.slice(0,6))
  return data.items.slice(0,6)
}

export async function getTopArtists() {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
    headers: {
      Authorization: "Bearer " + accessToken
    }
  })
  const data = await response.json()
  // console.log('top artists:', data.items.slice(0,6)) 
  return data.items.slice(0,6)
}

export async function getUserPlaylists(token) {
  const response = await fetch('https://api.spotify.com/v1/users/{user_id}/playlists', {
    headers: {
      Authorization: "Bearer " + token
    }
  })
  const data = await response.json()
  return data.items
}