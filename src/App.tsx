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
import Nav from "./components/Nav";
import ArtistPage from "./pages/ArtistPage";
import Home from "./pages/Home";

function App() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Artist[]>([]);
  const [searchType, setSearchType] = useState<SearchType>()
  const [artistResults, setArtistResults] = useState<Artist[]>();
  const [trackResults, setTrackResults] = useState<Track[]>()

  // type SearchType = (<Track> | <Artist> | <Album>)


  const api = SpotifyApi.withClientCredentials(
    "1553a231a3b74e48bb3dc6efdce3cb72",
    "37da88f137294d5a9f6a7ea57f0d4be9"
  );

  console.log(results);

  async function submit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    const items = await api.search(searchText, ["artist"]);
    console.log(items);
    setResults(items.artists.items);
    // settrackRes()
    //
    console.log(results)
  }

  return (
    <main>
      <Nav submit={submit} handleChange={setSearchText} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home results={results} />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
