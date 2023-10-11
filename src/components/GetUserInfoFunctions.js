

export async function getTopTracks() {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
      Authorization: "Bearer " + accessToken
    }
  })
  const data = await response.json()
  console.log('top tracks:', data)
}

export async function getTopArtists() {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
    headers: {
      Authorization: "Bearer " + accessToken
    }
  })
  const data = await response.json()
  console.log('top artists:', data) 
}