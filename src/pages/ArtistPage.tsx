import { useEffect, useState } from "react";
import { ListGroup, Image } from "react-bootstrap";
import { AiFillPauseCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { Market } from "@spotify/web-api-ts-sdk";
import useAuthStore from "../context/zustand";

const ArtistPage = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET
  const api = SpotifyApi.withClientCredentials(
    clientId,
    clientSecret
  );

  const [loaded, setLoaded] = useState<boolean>(false);
  const [artistInfo, setArtistInfo] = useState<null>(null);
  const [topTracks, setTopTracks] = useState<[]>();
  const { setCurrentTrack } = useAuthStore();
  const { id } = useParams<{ id: string }>();
  //should I create a type called ArtistInfo??

  async function getArtistInfo(artistId: string) {
    try {
      const artist = await api.artists.get(artistId);
      setArtistInfo(artist);
      setLoaded(true);
      console.log(artist);
    } catch (error) {
      console.error("Error fetching artist info", error);
    }
  }

  async function getTopTracks(artistId: string, market: Market) {
    const tracks = await api.artists.topTracks(artistId, market);
    setTopTracks(tracks.tracks);
    console.log(tracks);
  }

  //get data about artist
  useEffect(() => {
    getArtistInfo(id);
    getTopTracks(id, "US");
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
          <div className="top-tracks">
            <ListGroup
              as="ol"
              numbered
              className="dp-flex flex-col justify-content-center"
            >
              {/* {topTracks
                ? topTracks.map((track) => (
                    <ListGroup.Item key={track.uri} variant="dark" className="list-item" onClick={(e)=>{
                      if (e.detail >= 2) setCurrentTrack(track.uri, track.id, track.name, track.artists[0].name, track.album.images[2].url)
                    }}>
                      <div className="ms-2">
                        <div className="fw-bold">{track.name}</div>
                        {track.album.name}
                      </div>
                      </ListGroup.Item>
                  ))
                : null} */}
              {topTracks
                ? topTracks.map((track) => (
                    <div
                      onClick={() =>
                        setCurrentTrack(
                          track.uri,
                          track.id,
                          track.name,
                          track.artists[0].name,
                          track.album.images[2].url
                        )
                      }
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
      ) : (
        AiFillPauseCircle
      )}
    </div>
  );
};

export default ArtistPage;
