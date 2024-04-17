import { useEffect, useState } from "react";
import { ListGroup, Image } from "react-bootstrap";
import { AiFillPauseCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { Market } from "@spotify/web-api-ts-sdk";
import AlbumCard from "../../components/card_components/AlbumCard.tsx";
import "./ArtistPage.css";
import useAuthStore from "../../context/zustand.tsx";
import { isAccessTokenExpired, getToken } from "../../utils/Login.js";

const ArtistPage = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const api = SpotifyApi.withClientCredentials(clientId, clientSecret);

  const [loaded, setLoaded] = useState<boolean>(false);
  const [artistInfo, setArtistInfo] = useState<null>(null);
  const [topTracks, setTopTracks] = useState<[]>();
  const [topAlbums, setTopAlbums] = useState<[]>();
  const { setSelectedTrack, setSelectedPlaylist } = useAuthStore();
  const { id } = useParams<{ id: string }>();
  //should I create a type called ArtistInfo

  async function getArtistInfo(artistId: string) {
    try {
      const artist = await api.artists.get(artistId);
      setArtistInfo(artist);
      setLoaded(true);
    } catch (error) {
      console.error("Error fetching artist info", error);
    }
  }

  async function getArtistTopAlbums(artistId: string) {
    const accessToken = localStorage.getItem("access_token");
    const res = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?limit=5`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const data = await res.json();
    console.log({ data });
    setTopAlbums(data.items);
  }

  async function getTopTracks(artistId: string, market: Market) {
    const tracks = await api.artists.topTracks(artistId, market);
    setTopTracks(tracks.tracks);
  }

  //get data about artist
  useEffect(() => {
    if (isAccessTokenExpired()) {
      const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      });
      getToken(body);
    } else {
      getArtistInfo(id);
      getTopTracks(id, "US");
      getArtistTopAlbums(id);
    }
  }, [id]);

  return (
    <div>
      {loaded ? (
        <div>
          <div className="header">
            {artistInfo ? (
              <Image src={artistInfo.images[1].url} rounded />
            ) : null}
            {artistInfo ? (
              <h1 className="text-light">{artistInfo.name}</h1>
            ) : null}
          </div>
          <div className="artist-page-main">
            <h2 className="section-title">Discography</h2>
            <div className="top-albums">
              {topAlbums?.map((album) => (
                <AlbumCard album={album} />
              ))}
            </div>
            <div className="top-tracks">
              <h2 className="section-title">Top Tracks</h2>
              <ListGroup
                as="ol"
                numbered
                className="dp-flex flex-col justify-content-center"
              >
                {topTracks
                  ? topTracks.map((track) => (
                    <div
                      onClick={() => {
                        setSelectedTrack(
                          track.uri,
                          track.id,
                          track.name,
                          track.artists[0].name,
                          track.album.images[2].url
                        )
                        setSelectedPlaylist({ playlistId: "", playlistTracks: [] })
                      }}
                      className="songRow d-flex"
                      key={track.id}
                    >
                      <img
                        className="songRow-album"
                        src={track.album.images[2].url}
                      />
                      <div className="songRow-info text-light">
                        <h1 className="fs-4 songRow-trackName m-0">
                          {track.name}
                        </h1>
                        <div className="songRow-artist-album">
                          <p>{track.artists[0].name} </p>
                          <p> {track.album.name}</p>
                        </div>
                      </div>
                    </div>
                  ))
                  : null}
              </ListGroup>
            </div>
          </div>
        </div>
      ) : (
        <AiFillPauseCircle />
      )}
    </div>
  );
};

export default ArtistPage;
