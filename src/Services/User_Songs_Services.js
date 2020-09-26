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
    )},
    postNewUserSong(user_song, token){
        return fetch(`${config.API_ENDPOINT}/api/user-songs`, {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${token}`,
                'content-type': `application/json`
            },
            body: JSON.stringify(user_song)
        })
    },
    deleteUserSong(token, id){
        return fetch(`${config.API_ENDPOINT}/api/user-songs/${id}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${token}`,
                'content-type': `application/json`
            }
        })
    },
    getAllUserSongsByUserId(id, token){
        //gets all songs assocaited with a user + all practice history (excluding practice history)
        return fetch(`${config.API_ENDPOINT}/api/user-songs/byId/songs/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`,
                'content-type': 'application/json'
            }
        })
    },
    idConfirmation(id, token){
        return fetch(`${config.API_ENDPOINT}/api/user-song/${id}`, {
            headers: {
                'Authorizatoin': `bearer ${token}`,
                "content-type": 'applicatoin/json'
            }
        })
            
    }
}

export default UserSongsServices