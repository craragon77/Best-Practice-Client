import TokenServices from './TokenService';
import config from '../config';

//this will be the file with all the fetch requests that will be imported as necessary :)

const UserServices = {
    getAllUsers(){
        return fetch(`whatever the url will be`, {
            headers: {
                'authorization': `bearer ${TokenServices.getAuthToken()}`
            }
        })
    },
    postNewUser(user){
        return fetch(`${config.API_ENDPOINT}/api/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    },
    getUserStats(user_id){
        return fetch(`${config.API_ENDPOINT}/api/user_songs/ById/${user_id}`)
    }
}

export default UserServices;

