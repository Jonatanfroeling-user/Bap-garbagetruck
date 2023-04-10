
import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import {localStorageHelper} from '../../util/localStorage'

// config
const storageTilesId = 'id_tiles_ronse'
const url = 'http://localhost:3022/downloads/offlineroute/ronse'
const dirRoot = '/data'

const ImageDownloader = () => {
  const [status, setStatus] = useState('idle')



  const handleClick = async () => {
    try {
      setStatus('loading');
      const currentId = localStorageHelper.getItem(storageTilesId)

      const response = await axios.request({
        method: 'post',
        url: url,
        data: {'tile_id': currentId||''}
      })

      // localStorage.setItem('id_tiles_ronse', JSON.stringify("6433017ea89299d4ed9825e6"))
      // validate if update is requred or data was already up to date
      const { data } = response
      if(data.message === 'noupdate') {
        setStatus('noupdate')
        return
      }

      for(let image of data.images){
        const{pathName, imageUrl} = image
        const file = new Blob([imageUrl], { type: 'image/jpeg' });
        saveAs(file, pathName)
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
      {status === 'noupdate' && <p>Everything already up to date!</p>}
    </div>
  );
};

export default ImageDownloader;
