import React, { useState } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
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
import AlbumPage from "./pages/AlbumPage/AlbumPage"
import AccountPage from "./pages/AccountPage/AccountPage"
import Home from "./pages/Home";
import Footer from "./components/Player/Player";
import useAuthStore from './context/zustand';


function App() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Artist[]>([]);
  const [searchType, setSearchType] = useState('')
  // const [artistResults, setArtistResults] = useState<Artist[]>();
  const [trackResults, setTrackResults] = useState<Track[]>()

  // type SearchType = (<Track> | <Artist> | <Album>)

  const {isAuthenticated, accessToken} = useAuthStore()


  const clientId = import.meta.env.VITE_CLIENT_ID
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET
  const api = SpotifyApi.withClientCredentials(
    clientId,
    clientSecret
  );

  // console.log(results);
  // console.log({searchType})

  // async function submit(e: React.BaseSyntheticEvent, searchType: string) {
  //   e.preventDefault();
  //   console.log({searchType}, 'fun')
  //   console.log(searchType=='track')
    
  //   if (searchType === 'artist') {
  //     const items = await api.search(searchText, ['artist']);
  //     setResults(items.artists.items);
  //   }

  //   if (searchType === 'track') {
  //     const items = await api.search(searchText, ['track']);
  //     console.log({items})
  //   }

  //   else return
    
  //   console.log(results)
  // }

  async function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    
    const items = await api.search(searchText, ['artist'])
    setResults(items.artists.items)
  }
  

  return (
    <main>
      <BrowserRouter>
      <Nav submit={submit} handleChange={setSearchText} searchType={searchType} setSearchType={setSearchType}/>
        <Routes>
          <Route path="/" element={<Home results={results} />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
        </Routes>
      </BrowserRouter>
      {isAuthenticated ? <Footer /> : <h2>not logged in</h2>}
    </main>
  );
}

export default App;
