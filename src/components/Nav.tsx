import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";


const Nav = ({ submit, handleChange }) => {

  
  return (
    <div>
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
