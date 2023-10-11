import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.js";
import {
  getTopTracks,
  getTopArtists,
} from "../components/GetUserInfoFunctions.js";

const AccountPage = () => {
  const [userProfile, setUserProfile] = useState<Profile>();
  const [artists, setArtists] = useState()
  type Profile = {
    display_name: string;
    id: string;
    country: string;
    images: [];
    followers: number;
  };

  async function getProfile() {
    const accessToken = localStorage.getItem("access_token");
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    const data = await response.json();
    console.log(data);
    setUserProfile(data);
  }

  useEffect(() => {
    getProfile();
    console.log(userProfile);
    getTopTracks();
    getTopArtists();
  }, []);

  console.log(userProfile);
  return !userProfile ? (
    <h1>Loading...</h1>
  ) : (
    <div className="container-lg border border-primary">
      <div className="row">
        <div className="sidebar col bg-dark ">
          <Sidebar />
        </div>
        <div className="profile bg-dark col container-lg border border-primary">
          <img
            src={userProfile.images[1]?.url}
            className="rounded-circle shadow-4-strong"
          />
          <h1 className="text-light">{userProfile?.display_name}</h1>
          <div className="tracks-container container text-light border border-secondary">
            <h3>Top tracks</h3>
            {}
          </div>
          <div className="artists-container text-light border border-secondary container">
            <h3 className="col">Top artists</h3>
            {}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
