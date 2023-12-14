export async function getTopTracks() {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  const data = await response.json();
  // console.log('top tracks:', data.items.slice(0,6))
  return data.items.slice(0, 6);
}

export async function getTopArtists() {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term', {
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  const data = await response.json();
  // console.log('top artists:', data.items.slice(0,6)) 
  return data.items.slice(0, 6);
}

export async function getUserPlaylists(id) {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  const data = await response.json();
  return data.items;
}