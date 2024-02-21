export async function getTopTracks() {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  const data = await response.json();
  // console.log('top tracks:', data.items.slice(0,6))
  return data.items.slice(0, 6);
}

export async function getTopArtists() {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term",
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  const data = await response.json();
  // console.log('top artists:', data.items.slice(0,6))
  return data.items.slice(0, 6);
}

export async function getUserPlaylists(id) {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch(
    `https://api.spotify.com/v1/users/${id}/playlists`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  const data = await response.json();
  return data.items;
}

export const getTracksFromPlaylist = async (currentPlaylistId) => {
  const accessToken = localStorage.getItem("access_token");
  const data = await fetch(
    `https://api.spotify.com/v1/playlists/${currentPlaylistId}/tracks`,
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

export const getAlbumInfo = async (albumId) => {
  const accessToken = localStorage.getItem("access_token");
  const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  const data = await res.json();
  return data;
};
