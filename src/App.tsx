import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Artist,
  Track,
  Album,
  SpotifyApi,
  ItemTypes,
} from "@spotify/web-api-ts-sdk";
import TestCard from "./components/Card";
import "./App.css";
import Nav from "./components/Nav";
import ArtistPage from "./pages/ArtistPage";
import Home from "./pages/Home";

function App() {
  // type SearchType = (<Track> | <Artist> | <Album>)
  const [searchText, setSearchText] = useState("");
  // const [searchType, setSearchType] = useState<SearchType>()
  const [results, setResults] = useState<Artist[]>([]);
  // const [artistResults, setArtistResults] = useState<Artist[]>();
  // const [trackResults, setTrackResults] = useState<Track[]>()

  const api = SpotifyApi.withClientCredentials(
    "1553a231a3b74e48bb3dc6efdce3cb72",
    "37da88f137294d5a9f6a7ea57f0d4be9"
  );

  async function submit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    const items = await api.search(searchText, ["artist"]);
    console.log(items);
    setResults(items.artists.items);
    // settrackRes()
  }

  return (
    <main>
      <Nav submit={submit} handleChange={setSearchText} />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/artist/:id" element={<ArtistPage />} />
      </Routes>
      </BrowserRouter>
      {results.length != 0 ? (
        <div className="results-container">
          {results?.map((res) => (
            <TestCard props={res} />
          ))}
          {/* {results?.map(res=><div>res.name</div>)} */}
        </div>
      ) : null}
    </main>
  );
}

export default App;
