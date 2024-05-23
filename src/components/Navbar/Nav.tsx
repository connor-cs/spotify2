import { state, useState } from 'react'
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { AiFillHome } from "react-icons/ai";
// import {Login} from '../utils/Login.js'
import { login } from "../../utils/Login.js";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../context/zustand.js";
import "./Nav.css";

const Nav = ({ submit, handleChange, setSearchType, searchType }) => {
  const navigate = useNavigate();
  const {
    isAccessTokenExpired,
    accessToken,
    userProfilePic,
    setUserProfilePic,
  } = useAuthStore();
  const isAuthenticated = !isAccessTokenExpired();
  const [errors, setErrors] = useState(false)

  function goHome() {
    navigate("/");
  }

  function handleLogin() {
    login();
    navigate("/account");
  }

  function handleLogout() {
    navigate("/");
    localStorage.clear();
    setUserProfilePic("");
  }

  return (
    <div className="nav">
      <div className="d-flex m-2  nav-bar">
        {isAuthenticated ? (
          <img
            className="profile-pic"
            src={userProfilePic}
            onClick={() => navigate("/account")}
          />
        ) : null}


        <AiFillHome
          size={45}
          className="home-icon mr-5"
          onClick={() => goHome()}
        />
        <InputGroup className="mb-3 search-bar">
          <Form.Control
            type="text"
            onChange={(e) => handleChange(e.target.value)}
            placeholder="search"
          />

          {/* <Dropdown className="test-drop secondary" onSelect={(e) => setSearchType(e)}>
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
        </Dropdown> */}

          <select className="dropdown"
            value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="" >Search for...</option>
            <option value="artist">Artists</option>
            <option value="track">Tracks</option>
            <option value="album">Albums</option>
          </select>

          <button
            className="nav-button"
            type="submit"
            onClick={(e) => {
              if (searchType === "") {
                console.log("nope")
                setErrors(true)
              }
              else {
                setErrors(false)
                submit(e, searchType);
                goHome();
              }




            }}
          >
            Search
          </button>
          {isAuthenticated ? (
            <button className="nav-button" onClick={() => handleLogout()}>Log out</button>
          ) : (
            <button className="nav-button" onClick={() => handleLogin()}>Log in</button>
          )}
        </InputGroup>
      </div>
      {errors ? <div className='errors-div'>
        <p style={{ color: "white" }}>Please select a type of search!</p>
      </div> : null}

    </div>

  );
};

export default Nav;
