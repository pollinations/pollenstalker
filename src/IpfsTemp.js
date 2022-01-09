import { useState, useEffect } from 'react';
import useIpfsFactory from './hooks/useIPFSFactory'
import useIpfs from './hooks/useIPFS'
import useIPFSClient from './hooks/useIPFSClient';

function IPFSTemp() {
  const { ipfs, ipfsInitError } = useIPFSClient()

  const { id, getCIDContent } = useIpfs(ipfs, 'id')
  const [version, setVersion] = useState(null)

  useEffect(() => {
    if (!ipfs) return;
    const getVersion = async () => {

        
    const nodeId = await ipfs.version();
    setVersion(nodeId);

    }
    getVersion();
  }, [ipfs])

  async function handleClick(){
    console.log(getCIDContent('QmWDdsWS6s3VqbSFSdvdnpAabitTxQM4Dv3b89w81viFMJ'))
  }
  return <>
      <button  onClick={handleClick} children='getCID'/>

        {ipfsInitError && (
          <div >
            Error: {ipfsInitError.message || ipfsInitError}
          </div>
        )}
        {(id || version) &&
            <section >
            <h1 data-test='title'>Connected to IPFS</h1>
            <div >
              {id && <IpfsId obj={id} keys={['id', 'agentVersion']} />}
              {version && <IpfsId obj={version} keys={['version']} />}
            </div>
          </section>
        }
</>
}

const Title = ({ children, ipfs }) => {

  return <>
    <h2 >{children}</h2>
    </>
}

const IpfsId = ({keys, obj, ipfs}) => {
  if (!obj || !keys || keys.length === 0) return null
  return (
    <>
      {keys?.map((key) => (
        <div key={key}>
          <Title ipfs={ipfs}>{key}</Title>
          <div data-test={key}>{obj[key]}</div>
        </div>
      ))}
    </>
  )
}

export default IPFSTemp;