import Debug from "debug";
import { any, identity, last } from "ramda";

const debug = Debug("media");

// recognized media types
const _mediaTypeMap = {
    "all": [".jpg", ".jpeg", ".png", ".mp4",".webm"],
    "video": [".mp4",".webm"],
    "image": [".jpg", ".jpeg", ".png"],
    "text": [".md", ".txt"],
    "audio": [".mp3", ".wav", ".ogg",".flac"],
  }
  
// get first image for social media and other stuff    
export const getCoverImage = output => { 
  const image = output && getMedia(output, "image")[0];
  debug("coverImage", image);
  return image ? [image[0], gzipProxy(image[1])] : null;
}

// get first video for social media and other stuff
export const getCoverVideo = output => output && getMedia(output, "video")[0];


// Get all images and videos from ipfs output folder
export function getMedia(output, type="all") {
  
  const extensions = _mediaTypeMap[type]

  const filterByExtensions = filename => 
    any(identity, extensions.map(ext => filename.toLowerCase().endsWith(ext)))

  if (!output) return []
  
  return Object.keys(output)
  .filter(filterByExtensions)
  .map(filename => [filename, output[filename]])
  .reverse()
}

const gzipProxy = path => {
  const cid = last(path.split("/"));
  return `https://images.weserv.nl/?url=https://pollinations.ai/ipfs/${cid}`;
}
  


export function mediaToDisplay(output) {
  const mediaIn = getMedia(output);
  if (!mediaIn || mediaIn.length === 0) return EMPTY_MEDIA;

  // remove first image for large display
  const firstImage = mediaIn.shift()

  const images = every_nth(mediaIn);

  const first = {
      filename: firstImage[0],
      url: firstImage[1]
  }

  return { images, first }
}

function every_nth(array){
  const nth = Math.max(1, Math.floor(array.length / 20))
  return array.filter((e, i) => i % nth === nth - 1)
}

const EMPTY_MEDIA = { images: [], first: {} }