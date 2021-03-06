import TokenService from './TokenService';
import config from '../config';

const UserServices = {
    getAllUsers(){
        return fetch(`${config}/api/users`, {
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
    getUserStats(id, token){
        return fetch(`${config.API_ENDPOINT}/api/user-songs/HistoryById/${id}`, {
            
            headers: {
                'authorization': `bearer ${token}`,
                'content-type': 'application/json'
            }
        })
    },
    getUserById(id, token){
        return fetch(`${config.API_ENDPOINT}/api/users/${id}`, {
            headers: {
                'authorization': `bearer ${token}`,
                'content-type': 'application/json'
            }
        })
    }
}

export default UserServices;

