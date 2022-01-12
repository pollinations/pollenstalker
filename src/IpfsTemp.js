import { useState, useEffect, Suspense } from 'react';
import useSubscribe from './hooks/useSubscribe'
import useIPFS from './hooks/useIPFS';
import { getNotebookMetadata } from "./utils/notebookMetadata"
import { mediaToDisplay } from "./utils/media2display"
import moment from 'moment'

// Accepts the array and key
function groupBy(xs, f) {
  return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}

function IPFSTemp({ elapsed }) {
    const cid = useSubscribe("processing_pollen")
    const ipfs = useIPFS(cid)

    const [ pollenList, setList ] = useState([])
    const [ lastDate, setLastDate ] = useState()

    useEffect(()=>{


      // metadata
      const { primaryInput, firstContent } = getNotebookMetadata(ipfs)
      

      // if (pollenList.find( pollen => pollen.prompt === primaryInput) || (primaryInput === undefined)) return null
      if (!firstContent.url) return null

      setList(state => ([...state, { 
        prompt: primaryInput,
        result: firstContent,
        cid: ipfs.cid,
      }]))

      setLastDate( elapsed.diff(moment(), 'seconds') * -1)

    },[ipfs])

  
  return  <>
    <div style={{padding: '1em'}}>
      <InfoBlock 
      pollenList={pollenList} 
      elapsed={elapsed} 
      lastDate={lastDate}/>
    </div>
    {
      pollenList
      .filter( props => props.result !== undefined)
      .reverse()
      .map( props =>     
        <Article key={props.prompt} {...props} /> 
      ) 
    }
    {
      console.log(Object.entries(groupBy(pollenList, pollen => pollen.prompt)))
    }
  </>
}

const InfoBlock = ({ pollenList, lastDate, elapsed }) => {
  return <Suspense fallback={<p children='loading'/>}>
    <h2 children='follow the pollen'/>
    <p children={`IMG count: ${pollenList.length}`}/>
    <p children={`${(pollenList.length / lastDate).toFixed(2)} imgs / second`}/>
    <p children={`${moment().diff(elapsed, 'minutes') } minutes elapsed`}/>
    <p style={{fontSize: '0.8em', fontStyle: 'italic'}} children='obs: it will freeze the frontend at some point (for me around 1700 imgs).'/>
  </Suspense>
}

const Article = ({ prompt, result }) => {
  return <article class='article'>
    <img src={result?.url}/>
    <div>
      {/* <h5 children='Title'/> */}
      <p children={prompt}/>
    </div>
  </article>
}


export default IPFSTemp;