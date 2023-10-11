import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.js";
import {
  getTopTracks,
  getTopArtists,
} from "../components/GetUserInfoFunctions.js";

const AccountPage = () => {
  const [userProfile, setUserProfile] = useState<Profile>();

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
        <div className="col">
          <Sidebar />
        </div>
        <div className="col container-lg border border-primary">
          <img
            src={userProfile.images[1]?.url}
            className="rounded-circle shadow-4-strong"
          />
          <h1 className="text-light">{userProfile?.display_name}</h1>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
