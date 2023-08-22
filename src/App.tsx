import React, { useState } from "react";
import { Artist, Track, SpotifyApi } from "@spotify/web-api-ts-sdk";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Artist[]>();
  const [trackRes, settrackRes] = useState<Track[]>()

  // const clientID = "1553a231a3b74e48bb3dc6efdce3cb72";
  // const clientSecret = "37da88f137294d5a9f6a7ea57f0d4be9";

  const api = SpotifyApi.withClientCredentials(
    "1553a231a3b74e48bb3dc6efdce3cb72",
    "37da88f137294d5a9f6a7ea57f0d4be9"
  );

  async function submit(e: React.BaseSyntheticEvent) {
    e.preventDefault()
    const items = await api.search(search, ['track'])
    console.log(items)
    // setResults(items.artists.items)
    // settrackRes()
  }

  return (
    <main>
      <form onSubmit={(e)=>submit(e)}>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <button>Submit</button>
      </form>
      <div>
        {results?.map(res=>res.name)}
        {/* {results?.map(res=><div>res.name</div>)} */}
      </div>
    </main>
  );
}

export default App;
