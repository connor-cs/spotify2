
import { AiFillPlayCircle } from "react-icons/ai";
import { IoPlaySkipForward, IoPlaySkipBack, IoPauseCircle } from 'react-icons/io5'


const Footer = () => {
  return (
    <div className="footer d-flex fixed-bottom justify-content-between mb-4">
      {/* <div className="h4 text-light">This is the footer</div> */}
      <div className="footer-left">
        <p>song info</p>
      </div>
      <div className="footer-center">
        <IoPlaySkipBack className="footer-icon m-2" size={50} />
        <AiFillPlayCircle className="footer-icon m-2" size={50} />
        <IoPlaySkipForward className="footer-icon m-2" size={50} />
      </div>
      <div className="footer-right">
        <p>volume</p>
      </div>
    </div>
  )
}

export default Footer