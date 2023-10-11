import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const TestCard = ({ props }) => {
  const navigate = useNavigate()

  function nav() {
    navigate(`/artist/${props.id}`)
  }
  
  return (
    <Card key={props.id} className="card" onClick={()=>nav()}>
      <Card.Img variant="top" src={props.images[2] ? props.images[2].url : '/default.jpg'} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default TestCard;
