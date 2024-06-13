import { useNavigate } from "react-router-dom";
import './AlbumCard.css'
import Card from "react-bootstrap/Card";

const AlbumCard = ({ album }: object) => {
  const navigate = useNavigate();

  function nav() {
    navigate(`/album/${album.id}`);
  }

  const style = {
    "margin-top": "1rem",
    "marginBottom": "none",
    "color": "white"
  }

  return (
    <div key={album.id} className="album-card" onClick={() => nav()}>
      <img className="album-image" src={album.images[1].url} />
      <div className="album-card-content">
        <p style={style}>{album.name}</p>
        <p style={{ display: "inline", color: "white" }}>{album.release_date.slice(0, 4) + " -"}</p>
        <p style={{ display: "inline", color: "white" }}> Album</p>
      </div>
    </div>
  );
};

export default AlbumCard;
