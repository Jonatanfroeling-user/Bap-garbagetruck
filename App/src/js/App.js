import Header from "./components/Header";
import MapComponent from "./components/Map/index";
import Notifications from "./util/Notification";


const App = () => {
  return (
    <>

    <Header/>
    <MapComponent/>

    {
        Notifications.getContinainer()
    }
    </>

  );
};

export default App;