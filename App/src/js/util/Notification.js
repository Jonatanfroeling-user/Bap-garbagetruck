import { ToastContainer, toast } from 'react-toastify';


// https://fkhadra.github.io/react-toastify/introduction/

/**
 * A layer of abstraction for the user
 * For future devlopment another notification librabry might be used, but the only this file needs to undergo changes
 */
const Notifications = {
    getContinainer(){
        return <ToastContainer
            position={toast.POSITION.TOP_RIGHT}
            autoClose={4500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    },
    succes(message='Succes!', config={}){
        toast.success(message, config);
    },
    error(message='Unknown Error', config={}){
        toast.error(message, config);
    },
    info(message='Notification!',config={}){
        toast.info(message, config );
    },
    promise(promise=function(){}, msg='Downloading...', succes='Succes! 👌', error='An error occured'){
        toast.promise(
            promise,
            {
              pending: msg,
              success: succes,
              error: error
            })
    },
    progress(){
        console.log('https://fkhadra.github.io/react-toastify/use-a-controlled-progress-bar')
    },
    remove(id){
        toast.dismiss(id)
    },
    clear(){

    }
}

export default Notifications