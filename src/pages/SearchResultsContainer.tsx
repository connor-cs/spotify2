import { useEffect } from "react";
import ArtistCard from "../components/card_components/ArtistCard";
import { loginCallback } from "../utils/Login";
import useAuthStore from "../context/zustand";
import AlbumCard from "../components/card_components/AlbumCard";
import SongRow from "../components/SongRow/SongRow";

const SearchResultsContainer = ({ results }) => {

  const { searchType } = useAuthStore()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log({ code });

    if (code) {
      loginCallback();
    }
  }, []);

  if (results.length != 0) {
    if (searchType === 'artist') {
      return (
        <div className=".bg-dark">
          <div className="results-container">
            {results?.map((res) => (
              <ArtistCard props={res} key={res.id} />
            ))}
          </div>
        </div>
      )
    }
    else if (searchType === 'album') {
      return (
        <div className="results-container">
          {results?.map((album) => (
            <AlbumCard album={album} />
          ))}
        </div>
      )
    }
    else if (searchType === 'track') {
      return (
        <div className="results-container">
          {results?.map((track) => {
            <SongRow track={track} />
          })}
        </div>
      )
    }
  }


  // return (
  //   <div className=".bg-dark">

  //     {(results.length != 0 && searchType === 'artist') ? (
  //       <div className="results-container">
  //         {results?.map((res) => (
  //           <ArtistCard props={res} key={res.id} />
  //         ))}
  //       </div>
  //     ) : null}

  //   </div>
  // );
};

export default SearchResultsContainer;
