import React, { useState, useEffect } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import {
  IoPlaySkipForward,
  IoPlaySkipBack,
  IoPauseCircle,
} from "react-icons/io5";
import "./Player.css";
import useAuthStore from "../../context/zustand.js";
import { getTracksFromPlaylist } from "../../utils/GetUserInfoFunctions.js";

const Footer: React.FC<SpotifyPlayerProps> = () => {
  const [player, setPlayer] = useState<Spotify.SpotifyPlayer | null>(null);
  const [paused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const {
    selectedTrack,
    selectedPlaylistId,
    selectedPlaylistTrackList,
    setCurrentPlaylistTrackList,
    currentlyPlayingTrackUris,
  } = useAuthStore();
  const { trackUri } = selectedTrack;
  //I don't remember what this is for:
  const [currentlyPlayingUris, setCurrentlyPlayingTrackUris] = useState([]);
  // const activePlaylist = currentPlaylistTrackList.length > 0

  // console.log({ selectedPlaylistTrackList });

  // console.log({ selectedTrack });

  //move this into playerfunctions file?
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
          uris: [`${trackUri}`],
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
  //move this into playerfunctions file?
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
  //move this into playerfunctions file?
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

  //when playlist is clicked on from sidebar, get playlist id and use it to get tracks list
  useEffect(() => {
    getTracksFromPlaylist(selectedPlaylistId).then(
      (res) => setCurrentPlaylistTrackList(res)
      // setListTracks(res)
    );
    setCurrentPlaylistTrackList;
  }, [selectedPlaylistId]);

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
  }, []);

  return (
    <div className="footer d-flex  justify-content-between mb-4">
      <div className="footer-left track-info-section">
        <div className="">
          <img src={selectedTrack.image} />
        </div>
        <div className="player-track-info">
          <p className="player-songname">{selectedTrack.trackName}</p>
          <p className="player-artistname">{selectedTrack.artist}</p>
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
