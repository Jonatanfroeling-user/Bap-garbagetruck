
import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import mkdirp from 'mkdirp';

const url = 'http://localhost:3022/downloads/offlineroute/ronse'
const dirRoot = '/data'



const ImageDownloader = () => {
  const [status, setStatus] = useState('idle')



  const handleClick = async () => {
    try {
      setStatus('loading');
      const response = await axios.post(url)
      const { data } = response
      const rootFolder = dirRoot

      
      for (const folder of Object.keys(data)) {
        const subfolders = data[folder]
        for (const subfolder of Object.keys(subfolders)) {
          const images = subfolders[subfolder]
          const folderPath = `${rootFolder}/${folder}/${subfolder}`

          mkdirp.sync(folderPath);
          for (const image of images) {
           // const filePath = `${folderPath}/${image.fileName}`
            const file = new Blob([image.image], { type: 'image/jpeg' });
            saveAs(file, image.fileName)
          }
        }
      }
      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  };

  return (
    <div>
      <button disabled={status === 'loading'} onClick={handleClick}>
        {status === 'loading' ? 'Loading...' : 'Download Images'}
      </button>
      {status === 'success' && <p>Images downloaded successfully!</p>}
      {status === 'error' && <p>An error occurred. Please try again later.</p>}
    </div>
  );
};

export default ImageDownloader;
