import { useEffect, useState } from "react";


const AccountPage = () => {

  async function getProfile() {
    const accessToken = localStorage.getItem("access_token");
  
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  
    const data = await response.json();
    console.log(data);
    return data;
  }

  useEffect(()=>{
    const profile = getProfile()
    console.log(profile)
  }, [])

  return (
    <div>
      <h1>Account</h1>
    </div>
  );
};


export default AccountPage