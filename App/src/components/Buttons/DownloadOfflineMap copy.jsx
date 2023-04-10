
import React, { useState } from 'react';
import axios from 'axios';
const url = 'http://localhost:3022/downloads/offlineroute/ronse'
const dirRoot = '/data'

import React, { useState } from 'react';
import axios from 'axios';

const ImageDownloader = () => {
  const [status, setStatus] = useState('idle'); // Possible values: 'idle', 'loading', 'success', 'error'

  const handleClick = async () => {
    try {
      setStatus('loading');
      const response = await axios.post('http://localhost:3022/downloads/offlineroute/ronse');
      const { data } = response;
      const rootFolder = '/data'; // Set the root folder where you want to save the images
      for (const folder of Object.keys(data)) {
        const subfolders = data[folder];
        for (const subfolder of Object.keys(subfolders)) {
          const images = subfolders[subfolder];
          const folderPath = `${rootFolder}/${folder}/${subfolder}`;
          if (!await checkIfFolderExists(folderPath)) {
            await createFolder(folderPath);
          }
          for (const image of Object.values(images)) {
            const filePath = `${folderPath}/${image.fileName}`;
            await createFile(filePath, image.image);
          }
        }
      }
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const checkIfFolderExists = async (path) => {
    const response = await fetch(path, { method: 'HEAD' });
    return response.status === 200;
  };

  const createFolder = async (path) => {
    await fetch(path, { method: 'MKCOL' });
  };

  const createFile = async (path, contents) => {
    const blob = new Blob([contents]);
    const response = await fetch(path, {
      method: 'PUT',
      body: blob,
    });
    return response.status === 201;
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
