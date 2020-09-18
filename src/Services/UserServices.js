import TokenService from './TokenService';
import config from '../config';

//this will be the file with all the fetch requests that will be imported as necessary :)

const UserServices = {
    getAllUsers(){
        return fetch(`whatever the url will be`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
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
    getUserStats(id){
        
        return fetch(`${config.API_ENDPOINT}/api/user-songs/ById/${id}`, {
            //why is it yelling at me for this line ^^^
            headers: {
                //ok so it appears to be the bearer token here?
                'authorization': `bearer ${TokenService.getAuthToken}`,
                'content-type': 'application/json'
            }
        })
    }
}

export default UserServices;

