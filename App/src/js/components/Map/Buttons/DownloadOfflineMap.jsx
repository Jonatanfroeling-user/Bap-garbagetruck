
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import {localStorageHelper} from '../../../util/localStorage'
import Notifications from '../../../util/Notification';
import { Button } from 'react-bootstrap';
import { AiOutlineCloudDownload} from 'react-icons/ai';

// config
const storageTilesId = 'id_tiles_ronse';
const url = 'http://localhost:3022/downloads/offlineroute/ronse';
const dirRoot = '/data';

// first promise to disable and enable button
const ImageDownloader = ()=> {
    const currentId = localStorageHelper.getItem(storageTilesId)
    const [pending, setPending] = useState() // done hides button
    const notificationRef = useRef(null);

    
    
    const requestDownload = ()=> new Promise(async(resolve, reject) => {
        try {
            const response = await axios.request({
                method: 'post',
                url: url,
                data: {'tile_id': currentId||''},
                // onUploadProgress: p => {
                //   const progress = p.loaded / p.total;
                // }
            })

            // localStorage.setItem('id_tiles_ronse', JSON.stringify("6433017ea89299d4ed9825e6"))

            // validate if update is requred or data was already up to date
            const { data } = response
            if(data.message === 'noupdate') {
                resolve("Everything already up to date!  🙂")
                return
            } else {
                for(let image of data.images){
                    const{pathName, imageUrl} = image
                    const file = new Blob([imageUrl], { type: 'image/jpeg' });
                    saveAs(file, pathName)
                }
            
              setPending('done')
              resolve('Download complete! ')
            }
        } catch (error) {
            console.error(error)
            setPending(false)
            reject('Server error. Try back later.')
        }
    })

    function handleClick(){
      setPending(true)

      //notifications
      notificationRef.current = Notifications.promise( requestDownload,
        'Downloading...',
        {render:({data})=>data},
        {render:({data})=>data},
      )
    }

    return (
      <>
      {
        pending !== 'done' ?         
          <Button variant="dark" className={"btn-lg rounded-circle mt-4 circle-icon gradient "+ (pending?'disabled':'gradient')} onClick={()=>handleClick()}>
            <AiOutlineCloudDownload/>
          </Button> 
          : <></>
        }
      </>


    )
}

export default ImageDownloader;
