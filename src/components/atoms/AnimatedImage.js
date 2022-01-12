import { useEffect, useState } from "react";

const ImgAnimated = ({imgs, isHover}) => {
const [ count, setCount ] = useState(0)

// animate
// a bit jittery maybe using a lib? idk
useEffect(()=>{
    if (!isHover) return null
    let interval = setInterval(() => {
    setCount(state => (state + 1) % imgs.length)
    }, 100);
    return () => clearInterval(interval)
},[isHover])

return <div style={{width: '100%', minHeight: '50%',backgroundColor:'black',display: 'flex', alignItems: 'center'}}>
    <img src={imgs[count]?.result?.url} style={{width: '100%', height: 'auto'}}/>
</div>
}

export default ImgAnimated