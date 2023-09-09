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
  
  const [loaded, setLoaded] = useState<boolean>(false);
  const [artistInfo, setArtistInfo] = useState<ArtistInfo | null>(null);
  const { id } = useParams<{ id: string }>();

  async function getArtistInfo(artistId: string) {
    try {
      const artist = await api.artists.get(artistId);
      setArtistInfo(artist);
      setLoaded(true);
      console.log(artist)
    } catch (error) {
      console.error('Error fetching artist info', error);
    }
  }

  useEffect(() => {
    getArtistInfo(id);
  }, [id]);
  
  return (
    <div>
      <h1>artistName</h1>
      <div className="albums-container dp-flex flex-row justify-content-center">
        {/* <div className="album border border-2 border-white p-4 text-light">album 1</div> ////
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
      </div>
    </div>
  )
}

export default ArtistPage