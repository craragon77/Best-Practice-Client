import TokenServices from './TokenService';
import config from '../config';

//this will be the file with all the fetch requests that will be imported as necessary :)

const UserServices = {
    getAllUsers(){
        return fetch(`whatever the url will be`, {
            headers: {
                'authorization': `basic ${TokenServices.getAuthToken()}`
            }
        })
    }
}

