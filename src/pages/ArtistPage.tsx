import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { AiFillPauseCircle } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'

const ArtistPage = () => {
  const api = SpotifyApi.withClientCredentials(
    "1553a231a3b74e48bb3dc6efdce3cb72",
    "37da88f137294d5a9f6a7ea57f0d4be9"
  );
  
  const [loaded, setLoaded] = useState(false)
  const [albums, setAlbums] = useState([])
  const [artistInfo, setArtistInfo] = useState(null)
  const [id, setId] = useState<string>('')

  //ask about this
  const params = useParams()
  const artistId= params['id']
  console.log(artistId)
  setId(artistId)
  console.log({id})
  

  async function getArtistInfo(artistId) {
    try {
      const artist = await api.artists.get(id);
      setArtistInfo(artist); // Set the artist info once fetched
      setLoaded(true);
    } catch (error) {
      console.error('Error fetching artist info', error);
    }
  }

  useEffect(() => {
    getArtistInfo(artistId); // Fetch artist info when artistID changes
  }, []); // Add artistID as a dependency
  
  return (
    <div>
      <h1>artistName</h1>
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