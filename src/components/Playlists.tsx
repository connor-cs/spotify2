const Playlists = ({ playlists }) => {
  interface Playlist {
    id: "string";
    name: "string";
    images: [];
  }

  return (
    <div className="playlist">
      <ul className="m-0 p-0">
        {playlists.map((list: Playlist) => {
          return <li onClick={()=>console.log(list.uri)} className="playlist-name" key={list.id}>{list.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Playlists;
