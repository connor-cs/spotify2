import React, { useState } from "react";
import { Artist, Track, Album, SpotifyApi, ItemTypes } from "@spotify/web-api-ts-sdk";
import Card from "./components/Card";
import "./App.css";

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
    //
  }

  return (
    <main>
      <form onSubmit={(e) => submit(e)}>
        <input type="text" onChange={(e) => setSearchText(e.target.value)} />
        <select>
          <option value="artist">Artist</option>
          <option value="track">Track</option>
          <option value="album">Album</option>
        </select>
        <button>Submit</button>
      </form>
      <div className="results-container">
        {results?.map((res) => (
          <Card props={res} />
        ))}
        {/* {results?.map(res=><div>res.name</div>)} */}
      </div>
    </main>
  );
}

export default App;
