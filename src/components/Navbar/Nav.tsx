import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { AiFillHome } from "react-icons/ai";
// import {Login} from '../utils/Login.js'
import { login } from "../../utils/Login.js";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../context/zustand.js";
import './Nav.css'

const Nav = ({ submit, handleChange, setSearchType, searchType }) => {
  const navigate = useNavigate();
  const { isAuthenticated, accessToken } = useAuthStore();

  function goHome() {
    navigate("/");
  }

  function handleLogin() {
    login();
    navigate("/account");
  }

  return (
    <div className="d-flex m-2">
      <AiFillHome
        size={40}
        className="home-icon mr-5"
        onClick={() => goHome()}
      />
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          onChange={(e) => handleChange(e.target.value)}
          placeholder="search"
        />

        <Dropdown onSelect={(e) => setSearchType(e)}>
          <Dropdown.Toggle>Select</Dropdown.Toggle>
          <Dropdown.Menu onSelect={(e) => setSearchType(e)}>
            <Dropdown.Item eventKey="artist" value="artist">
              Artist
            </Dropdown.Item>
            <Dropdown.Item eventKey="track" value="track">
              Track
            </Dropdown.Item>
            <Dropdown.Item eventKey="album">Album</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button
          type="submit"
          onClick={(e, searchType) => submit(e, searchType)}
        >
          Search
        </Button>

        <Button onClick={() => handleLogin()}>Log in</Button>

        {isAuthenticated ? (
          <Button onClick={() => console.log("authenticated")}>Test</Button>
        ) : null}
      </InputGroup>
    </div>
  );
};

export default Nav;
