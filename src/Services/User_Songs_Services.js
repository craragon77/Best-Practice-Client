import TokenService from './TokenService';
import config from '../config';

const UserSongsServices = {
    getAllUserSongsBasedOnId(id, token){
        //gets all songs assocaited with a user + all practice history (excluding practice history)
        return fetch(`${config.API_ENDPOINT}/api/user-songs/byId/songs/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`,
                'content-type': 'application/json'
            }
        })
    },
    getUserSongsForHistoryPost(id, token){
        return fetch(`${config.API_ENDPOINT}/api/user-songs/getSongsForHistoryPost/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`,
                'content-type': 'application/json'
            }
        }
    )}
}

export default UserSongsServices