import { useState } from "react"
import ImgAnimated from "../atoms/AnimatedImage"

const PollenCard = props => {

  const [isHover, setHover] = useState(false)

  return <article 
    className='article' 
    onMouseOver={()=>setHover(true)} 
    onMouseOut={()=>setHover(false)}>
    
    <ImgAnimated imgs={props[1]} isHover={isHover}/>

    <div>
      <p children={props[0]}/>
      <p children={`Frames: ${props[1].length}`}/>
    </div>
  </article>
}

  export default PollenCard