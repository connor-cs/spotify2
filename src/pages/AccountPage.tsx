import { useEffect, useState } from "react";

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
    console.log(userProfile)
  }, []);

  console.log(userProfile)
  return !userProfile ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <div className="container-lg">
        <img
          src={userProfile.images[1]?.url}
          className="rounded-circle shadow-4-strong"
        />
        <h1 className="text-light">{userProfile?.display_name}</h1>
      </div>
    </div>
  );
};

export default AccountPage;
