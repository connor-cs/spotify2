import {useNavigate} from 'react-router-dom'

export const AlbumCard = ({props}) => {
  
  function nav(albumId){
    navigate(`/album/${albumId}`)
  }
  
  return (
    <div key={props.id} onClick={()=>navigate({props.id})}>
      <img src={props.images[1].url}/>
      <div className="">
        <p>{props.name}</p>
        <p>{props.release_date.slice(0,5)}<p style={{"display": "inline"}}>Album</p>
      </div>
      </div>)
}
