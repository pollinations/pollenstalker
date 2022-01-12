import { useState, useEffect } from 'react'
import moment from 'moment'
import { groupBy } from '../utils/convenience'

// IPFS stuff
import useSubscribe from '../hooks/IPFS hooks/useSubscribe'
import useIPFS from '../hooks/IPFS hooks/useIPFS'
import { getNotebookMetadata } from "../utils/notebookMetadata"

// Cards
import PollenCard from '../components/molecules/Card'
import InfoCard from '../components/molecules/InfoCard'


function Home({ elapsed, setDarkMode }) {
    const cid = useSubscribe("processing_pollen")
    const ipfs = useIPFS(cid)

    const [ pollenList, setList ] = useState([])
    const [ lastDate, setLastDate ] = useState()

    useEffect(()=>{

      // metadata
      const { primaryInput, firstContent } = getNotebookMetadata(ipfs)
      
      // if empty return null
      if (!firstContent.url) return null

      // otherwise push item
      setList(state => ([...state, { 
        prompt: primaryInput,
        result: firstContent,
        cid: ipfs.cid,
      }]))

      // time elapsed minutes
      setLastDate( elapsed.diff(moment(), 'seconds') * -1)

    },[ipfs])

  
  return  <>
    <div style={{ padding: '1em' }}>
      <InfoCard 
      setDarkMode={setDarkMode}
      pollenList={pollenList} 
      elapsed={elapsed} 
      lastDate={lastDate}/>
    </div>
    
    {
      Object.entries(groupBy(pollenList, pollen => pollen.prompt))
      .map( pollen => <PollenCard key={pollen[0]} {...pollen}/>)
    }
  </>
}

export default Home