import { useEffect } from "react";
import ArtistCard from "../components/card_components/ArtistCard";
import { loginCallback } from "../utils/Login";

const SearchResultsContainer = ({ results }) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log({ code });

    if (code) {
      loginCallback();
    }
  }, []);

  // console.log(results)

  return (
    <div className=".bg-dark">
      
      {results.length != 0 ? (
        <div className="results-container">
          {results?.map((res) => (
            <ArtistCard props={res} key={res.id} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchResultsContainer;
