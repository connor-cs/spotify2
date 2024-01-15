import React, { useState, useEffect } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import {
  IoPlaySkipForward,
  IoPlaySkipBack,
  IoPauseCircle,
} from "react-icons/io5";
import "./Footer.css";
import useAuthStore from "../../context/zustand";
import { getTracksFromPlaylist } from "./PlayerFunctions";

interface SpotifyPlayerProps {
  token: string;
  uris: [
    "spotify:track:2z772Yunx3jUbh6YLY8HU2",
    "spotify:track:6ivUoajqXRNVIyEGhRkucw"
  ]; // Array of track URIs to play
}

const Footer: React.FC<SpotifyPlayerProps> = ({ uris }) => {
  const [player, setPlayer] = useState<Spotify.SpotifyPlayer | null>(null);
  const [paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentTrack, currentPlaylistId } = useAuthStore();
  const { currentTrackUri } = currentTrack;
  const [listTracks, setListTracks] = useState([]);

  //
  console.log(currentPlaylistId);
  console.log({ listTracks });
  
  // let Spotifyplayer: Spotify.SpotifyPlayer | null = null;

  const handlePlay = async () => {
    const accessToken = localStorage.getItem("access_token");

    await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({
          uris: [`${currentTrackUri}`],
        }),
      }
    );
    if (player) {
      player.togglePlay().then(() => {
        console.log("Resumed playback");
      });
    }
    setIsPlaying(true);
  };

  const handlePause = async () => {
    const accessToken = localStorage.getItem("access_token");

    await fetch(
      `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    if (player) {
      player.pause().then(() => {
        console.log("Paused playback");
      });
    }
    setIsPlaying(false);
  };

  const handleNext = async () => {
    const accessToken = localStorage.getItem("access_token");

    await fetch(
      `https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`
    ),
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

    if (player) {
      player.nextTrack().then(() => {
        console.log("Skipped to the next track");
      });
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    const getTracksFromPlaylist = async () => {
      const data = await fetch(
        `https://api.spotify.com/v1/playlists/${currentPlaylistId}/tracks`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      const tracks = await data.json();
      setListTracks(tracks.items)
    };
    
    getTracksFromPlaylist()
    
    

  }, [currentPlaylistId]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    const token = localStorage.getItem("access_token");
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });
      setPlayer(player);
      console.log({ player });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });
      player.addListener("initialization_error", ({ message }) => {
        console.error("Initialization Error:", message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error("Authentication Error:", message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error("Account Error:", message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error("Playback Error:", message);
      });
      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }
        setCurrentTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect().then((success) => {
        if (success) {
          console.log("Connected to spotify player!");
        }
      });
    };
  }, [uris]);

  return (
    <div className="footer d-flex  justify-content-between mb-4">
      <div className="footer-left track-info-section">
        <div className="">
          <img src={currentTrack.image} />
        </div>
        <div className="player-track-info">
          <p className="player-songname">{currentTrack.trackName}</p>
          <p className="player-artistname">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="footer-center">
        <IoPlaySkipBack
          className="footer-icon m-2"
          size={40}
          onClick={() => player?.previousTrack()}
        />
        {isPlaying ? (
          <AiFillPauseCircle
            className="footer-icon m-2"
            size={40}
            onClick={() => handlePause()}
          />
        ) : (
          <AiFillPlayCircle
            className="footer-icon m-2"
            size={40}
            onClick={() => handlePlay()}
          />
        )}

        <IoPlaySkipForward
          className="footer-icon m-2"
          size={40}
          onClick={() => handleNext()}
        />
      </div>
      <div className="footer-right">
        <p>volume</p>
      </div>
    </div>
  );
};

export default Footer;
