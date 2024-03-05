import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthStore from "../../context/zustand.tsx";
import "./AlbumPage.css";
import { isAccessTokenExpired, getToken } from "../../utils/Login.js";
// import {getAlbumInfo} from '../../utils/GetUserInfoFunctions.js'

const AlbumPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [albumInfo, setAlbumInfo] = useState(null);
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
    if (isAccessTokenExpired()) {
      const clientId = import.meta.env.VITE_CLIENT_ID;
      const refreshToken = localStorage.getItem("refresh_token");
      const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
      });
      getToken(body);
    } else {
      getAlbumInfo(albumId).catch((error) => console.log(error))
    }
  }, []);

  return (
    <div>
      <div className="top-section">
        {albumInfo ? (
          <>
            <img src={albumInfo.images[1]?.url} />
            <div className="album-info-section">
              <h1 style={{ display: "inline" }}>{albumInfo.name + " "}</h1>{" "}
              <h3 style={{ display: "inline" }}>
                {" - " + albumInfo.release_date.slice(0, 4)}
              </h3>
            </div>
          </>
        ) : null}
      </div>
      <div className="album-songs-container">
        {albumInfo
          ? albumInfo.tracks.items.map((track) => (
            <div className="songRow" key={track.id}>
              <p>{track.name}</p>
            </div>
          ))
          : null}
      </div>
    </div>
  );
};

export default AlbumPage;
