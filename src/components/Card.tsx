import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const TestCard = ({ props }) => {
  const navigate = useNavigate()
  
  return (
    <Card key={props.id} onClick={()=>navigate('/artist/:id')}>
      <Card.Img variant="top" src={props.images[1] ? props.images[1].url : '/public/default.jpg'} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default TestCard;
