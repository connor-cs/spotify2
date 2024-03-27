
const API_BASE_URL = "https://api.spotify.com/v1";

export async function fetchWithAuth(url, isAccessTokenExpired, getToken) {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken || isAccessTokenExpired()) {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const refreshToken = localStorage.getItem("refresh_token");
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    });
    getToken(body);
  }
  const headers = { Authorization: "Bearer " + accessToken };
  return fetch(API_BASE_URL + url, { headers });
}

export async function getTopTracks() {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch(API_BASE_URL + "/me/top/tracks", {
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
    API_BASE_URL + "/me/top/artists?time_range=long_term",
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
  const response = await fetch(API_BASE_URL + `/users/${id}/playlists`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  const data = await response.json();
  return data.items;
}

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

export const getAlbumInfo = async (albumId) => {
  const accessToken = localStorage.getItem("access_token");
  const res = await fetch(API_BASE_URL + `/v1/albums/${albumId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  const data = await res.json();
  return data;
};
