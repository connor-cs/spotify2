import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import {AiFillHome} from "react-icons/ai";


const Nav = ({ submit, handleChange, setType }) => {
  

  function goHome() {
    window.location.href='/'
  }
  
  return (
    <div className="d-flex m-2">
      <AiFillHome size={40}className="home-icon mr-5" onClick={()=>goHome()}/>
      <InputGroup className="mb-3">
        <Form.Control type="text" onChange={(e)=>handleChange(e.target.value)} placeholder="search"/>

        <Dropdown onSelect={(e)=>setType(e)}>
          <Dropdown.Toggle>Select</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="artist">Artist</Dropdown.Item>
            <Dropdown.Item eventKey="track">Track</Dropdown.Item>
            <Dropdown.Item eventKey="album">Album</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button type="submit" onClick={(e)=>submit(e)}>Search</Button>
      </InputGroup>
    </div>
  );
};

export default Nav;
