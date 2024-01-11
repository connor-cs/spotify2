import useAuthStore from "../context/zustand";

const Playlists = ({ playlists }) => {
  const { setCurrentPlaylist } = useAuthStore();
  interface Playlist {
    id: "string";
    name: "string";
    images: [];
  }

  return (
    <div className="playlist">
      <ul className="m-0 p-0">
        {playlists.map((list: Playlist) => {
          return (
            <li
              onClick={() => setCurrentPlaylist(list.uri)}
              className="playlist-name"
              key={list.id}
            >
              {list.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Playlists;
