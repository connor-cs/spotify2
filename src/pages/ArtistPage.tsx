import React from 'react'
import Card from 'react-bootstrap/Card'

const ArtistPage = () => {
  return (
    <div>
      <div className="albums-container dp-flex flex-row justify-content-center">
        {/* <div className="album border border-2 border-white p-4 text-light">album 1</div>
        <div className="album border border-2 border-white p-4 text-light">album 2</div>
        <div className="album border border-2 border-white p-4 text-light">album 3</div> */}
        <Card key={1} className="card">
          <Card.Img variant="top" src={'/default'} />
          <Card.Body>
            <Card.Title>Album 1</Card.Title>
          </Card.Body>
        </Card>
        <Card key={2} className="card">
          <Card.Img variant="top" src={'/default'} />
          <Card.Body>
            <Card.Title>Album 2</Card.Title>
          </Card.Body>
        </Card>
        <Card key={3} className="card">
          <Card.Img variant="top" src={'/default'} />
          <Card.Body>
            <Card.Title>Album 3</Card.Title>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default ArtistPage