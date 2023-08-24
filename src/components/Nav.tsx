import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import {AiFillHome} from "react-icons/ai";


const Nav = ({ submit, handleChange }) => {
  

  function goHome() {
    window.location.href='/'
  }
  
  return (
    <div className="d-flex m-2">
      <AiFillHome size={40}className="home-icon mr-5" onClick={()=>goHome()}/>
      <InputGroup className="mb-3">
        <Form.Control type="text" onChange={(e)=>handleChange(e.target.value)} placeholder="search"/>

        <Dropdown>
          <Dropdown.Toggle>Select</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Artist</Dropdown.Item>
            <Dropdown.Item>Track</Dropdown.Item>
            <Dropdown.Item>Album</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button type="submit" onClick={(e)=>submit(e)}>Search</Button>
      </InputGroup>
    </div>
  );
};

export default Nav;
