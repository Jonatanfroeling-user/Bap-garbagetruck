import { ButtonGroup, Button } from 'react-bootstrap';
import { useMap } from 'react-leaflet';
import { FaMapMarkedAlt } from 'react-icons/fa';
import {AiFillEnvironment} from  'react-icons/ai';
import Notifications from '../../../util/Notification';
import ImageDownloader from './DownloadOfflineMap';


const MapOptions = ({resetMap=()=>''}) => {
   const map = useMap()

   function handleMapRecenter(e){
    e.preventDefault()
    map.setView([51.505, -0.09], 13);
    Notifications.error('muahgha')
   }



    return (
        <div className="position-absolute top-0 right-0" style={{'zIndex':2000}}>
            <ButtonGroup vertical>
                <Button variant="dark" className="btn-lg rounded-circle mt-4 circle-icon gradient">
                    <FaMapMarkedAlt/>
                </Button>
                <Button variant="dark" className="btn-lg rounded-circle mt-4 circle gradient-blue" onClick={handleMapRecenter}>
                    <AiFillEnvironment/>
                </Button>
                <ImageDownloader />
            </ButtonGroup>
        </div>
    );
};

export default MapOptions;