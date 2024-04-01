import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import {
  getTopTracks,
  getTopArtists,
  getUserPlaylists,
} from "../../utils/GetUserInfoFunctions.js";
import { getToken, isAccessTokenExpired } from "../../utils/Login.js";
import { fetchWithAuth } from "../../utils/GetUserInfoFunctions";
import ArtistCard from "../../components/card_components/ArtistCard.js";
import SongRow from "../../components/SongRow/SongRow.js";
import { Artist, Track } from "@spotify/web-api-ts-sdk";
import useAuthStore from "../../context/zustand.js";
import "./AccountPage.css";

const AccountPage = () => {
  const [userProfile, setUserProfile] = useState<Profile>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const { currentTrack, setCurrentTrack, setUserProfilePic } = useAuthStore();
  // console.log(currentTrack)

  type Profile = {
    display_name: string;
    id: string;
    country: string;
    images: [];
    followers: number;
  };
  const accessToken = localStorage.getItem("access_token");

  async function getProfileData() {
    try {
      const res = await fetchWithAuth("/me", isAccessTokenExpired, getToken);
      const profileData = await res.json();
      setUserProfile(profileData);
      setUserProfilePic(profileData?.images[0].url);
      const topArtists = await getTopArtists();
      setArtists(topArtists);
      const topTracks = await getTopTracks();
      setTracks(topTracks);
    } catch (err) {
      console.log(err);
    }
  }

  //get profile data and userID
  useEffect(() => {
    getProfileData()
  }, []);

  //second useEffect for getting playlist data with userID
  useEffect(() => {
    if (userProfile && userProfile.id) {
      getUserPlaylists(userProfile.id)
        .then((userPlaylists) => {
          setPlaylists(userPlaylists);
        })
        .catch((error) => {
          console.error("Error fetching playlists:", error);
        });
    }
  }, [userProfile, accessToken]);

  // console.log("tracks", tracks);
  // console.log("artists", artists);

  return !userProfile ? (
    <h1>Loading profile...</h1>
  ) : (
    <div className=" account-page container-lg ">
      <div className="row">
        <div className="sidebar col  w-30">
          {!playlists ? (
            <h3 className="text-light">Loading playlists...</h3>
          ) : (
            <Sidebar playlists={playlists} />
          )}
          {/* <Sidebar playlists={playlists}/> */}
        </div>
        <div className="profile col container-lg ">
          <img
            src={userProfile.images[1]?.url}
            className="rounded-circle shadow-4-strong profile-picture"
          />
          <h1 className="text-light">{userProfile?.display_name}</h1>
          <div className="tracks-container container text-light ">
            <h3>Your top tracks</h3>
            <div className="d-flex flex-column">
              {tracks?.map((track) => (
                <div key={track.id}>
                  <SongRow track={track} />
                </div>
              ))}
            </div>
          </div>
          <div className="artists-container text-light container">
            <h3 className="col">Top artists</h3>
            <div className="row">
              {artists?.map((artist) => (
                <div key={artist.id} className="col">
                  <ArtistCard props={artist} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
