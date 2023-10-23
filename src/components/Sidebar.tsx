import { Image } from "react-bootstrap";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";

const Sidebar = ({ playlists }) => {
  return (
    <aside>
      <div className="border border-primary text-light">
        <Image
          className="spot-logo"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          alt="spotify"
        />
      </div>
      <div className="playlists-container text-light">
      <ul className="ul">
        <li>
          <MdHomeFilled />
          <h5>Home</h5>
        </li>
        <li>
          <MdSearch />
          <h5>Search</h5>
        </li>
        <li>
          <IoLibrary />
          <h5>Library</h5>
        </li>
      </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
