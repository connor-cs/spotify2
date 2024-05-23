import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Artist,
  Track,
  Album,
  SpotifyApi,
  ItemTypes,
} from "@spotify/web-api-ts-sdk";
import "./App.css";
import Nav from "./components/Navbar/Nav";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import AlbumPage from "./pages/AlbumPage/AlbumPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import Home from "./pages/SearchResultsContainer";
import Player from "./components/Player/Player";
import useAuthStore from "./context/zustand";
import SearchResultsContainer from "./pages/SearchResultsContainer";

function App() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Artist[]>([]);
  const [searchType, setSearchType] = useState("");
  // const [artistResults, setArtistResults] = useState<Artist[]>();
  const [trackResults, setTrackResults] = useState<Track[]>();

  // type SearchType = (<Track> | <Artist> | <Album>)

  const { isAccessTokenExpired } = useAuthStore();
  const isAuthenticated = !isAccessTokenExpired();

  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const api = SpotifyApi.withClientCredentials(clientId, clientSecret);

  //refactor this to avoid repetition:
  async function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchType === 'artist') {
      const items = await api.search(searchText, ['artist']);
      // console.log(items)
      setResults(items.artists.items);
    } else if (searchType === 'track') {
      const items = await api.search(searchText, ['track']);
      console.log(items)
      setTrackResults(items.tracks.items);
    } else if (searchType === 'album') {
      const items = await api.search(searchText, ['album']);
      // console.log(items)
      setResults(items.albums.items);
    }

    // const items = await api.search(searchText, ["artist"]);
    // setResults(items.artists.items);
  }

  return (
    <main>
      <BrowserRouter>
        <Nav
          submit={submit}
          handleChange={setSearchText}
          searchType={searchType}
          setSearchType={setSearchType}
        />
        <Routes>
          <Route path="/" element={<SearchResultsContainer results={results} />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
        </Routes>
      </BrowserRouter>
      {isAuthenticated ? <Player /> : null}
    </main>
  );
}

export default App;
