import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import { AiFillPauseCircle } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import { Market } from '@spotify/web-api-ts-sdk'

const ArtistPage = () => {
  const api = SpotifyApi.withClientCredentials(
    "1553a231a3b74e48bb3dc6efdce3cb72",
    "37da88f137294d5a9f6a7ea57f0d4be9"
  );
  
  const [loaded, setLoaded] = useState<boolean>(false);
  const [artistInfo, setArtistInfo] = useState<null>(null);
  const [topTracks, setTopTracks] = useState<[]>(null)
  const { id } = useParams<{ id: string }>();
  //should I create a type called ArtistInfo??

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

  async function getTopTracks(artistId: string, market: Market) {
    const tracks = await api.artists.topTracks(artistId, market)
    setTopTracks(tracks)
    console.log(tracks)
  }

  useEffect(() => {
    getArtistInfo(id);
    getTopTracks(id, 'US')
  }, [id]);
  
  return (
    <div>
      <div className="header">
        {artistInfo ? <Image src={artistInfo.images[1].url} rounded /> : null}
        {artistInfo ? <h1 className='text-light'>{artistInfo.name}</h1> : null}
      </div>
      <div className="albums-container dp-flex flex-row justify-content-center">
        {/* <div className="album border border-2 border-white p-4 text-light">album 1</div> ////
        <div className="album border border-2 border-white p-4 text-light">album 2</div>
        <div className="album border border-2 border-white p-4 text-light">album 3</div> */}
      </div>
    </div>
  )
}

export default ArtistPage