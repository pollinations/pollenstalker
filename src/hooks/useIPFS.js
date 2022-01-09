import { useState, useEffect } from 'react'
import dotProp from 'dot-prop'
// dot-prop: used to obtain a property of an object when the name of property is a string
// here we get ipfs.id when calling dotProp.get(ipfs, cmd), with cmd = 'id'
// and we get ipfs.hash when calling with cmd = 'hash' etc.

/*
 * Pass the command you'd like to call on an ipfs instance.
 *
* callIpfs uses setState write the response as a state variable, so that your component
 * will re-render when the result 'res' turns up from the call await ipfsCmd.
 *
 */
export default function useIPFS (ipfs, cmd, opts) {
  const [res, setRes] = useState(null)
  useEffect(() => {
    if(!ipfs) return null
    callIpfs(ipfs, cmd, setRes, opts)
  }, [ipfs, cmd, opts])

  async function getCIDContent(contentID) {

    if (!contentID) throw new Error('You must provide a contentID')
    let res = await ipfs.cat(contentID, (err, files) => {
      console.log(err,files)
        files.forEach(file => console.log({
            path: file.path,
            content: file.content.toString('utf8')
        }))
        console.log(res)
    return res
    })
}
  return ({ id: res, getCIDContent})
}

async function callIpfs (ipfs, cmd, setRes, ...opts) {
  if (!ipfs) return null
  console.log(`Call ipfs.${cmd}`)
  const ipfsCmd = dotProp.get(ipfs, cmd)
  const res = await ipfsCmd(...opts)
  console.log(`Result ipfs.${cmd}`, res)
  setRes(res)
}

