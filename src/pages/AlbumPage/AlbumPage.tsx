import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";import useAuthStore from "../../context/zustand.tsx";
// import {getAlbumInfo} from '../../utils/GetUserInfoFunctions.js'

const AlbumPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [albumInfo, setAlbumInfo] = useState();
  const { setCurrentTrack } = useAuthStore();
  

  const getAlbumInfo = async (albumId: string) => {
    const accessToken = localStorage.getItem("access_token");
    const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    const data = await res.json();
    setAlbumInfo(data);
    console.log({ albumInfo });
  };

  useEffect(() => {
    getAlbumInfo(albumId);
  }, []);

  return (
    <div>
      <div className="top-section">
        <img src={albumInfo.images[1]?.url} />
        <div className="album-info-section">
          <h1>{albumInfo.name}</h1>
        </div>
      </div>
      <div className="album-songs-container">
        {albumInfo.tracks.map((track) => (
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
            <img className="songRow-album" src={track.album.images[2].url} />
            <div className="songRow-info text-light">
              <h1 className="fs-4 songRow-trackName m-0">{track.name}</h1>
              <div className="songRow-artist-album">
                <p>{track.artists[0].name} </p>
                <p> {track.album.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumPage;
