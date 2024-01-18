import useAuthStore from "../context/zustand";

const SongRow = ({ track }) => {
  const {setCurrentTrack} = useAuthStore()
  // console.log(currentTrack)
  
  return (
    <div onClick={()=>setCurrentTrack(track.uri, track.id, track.name, track.artists[0].name, track.album.images[2].url)
    set
    } className="songRow d-flex" key={track.id}>
      <img className="songRow-album" src={track.album.images[2].url} />
      <div className="songRow-info text-light">
        <h1 className="fs-4 songRow-trackName m-0">{track.name}</h1>
        <div className="songRow-artist-album">
          <p>{track.artists[0].name} </p>
          <p> {track.album.name}</p>
        </div>
        {/* <p>{track.artists[0].name}{" "} {track.album.name}</p> */}
      </div>
    </div>
  );
};

export default SongRow;
