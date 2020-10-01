import config from '../config';

const UserSongsServices = {
    getAllUserSongsBasedOnId(id, token){
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
        return fetch(`${config.API_ENDPOINT}/api/user-songs/byId/songs/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`,
                'content-type': 'application/json'
            }
        })
    },
    simpleGetUserSongsConfirmation(id, token){
        return fetch(`${config.API_ENDPOINT}/api/user-songs/confirmation/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`,
                "content-type": 'applicatoin/json'
            }
        })
            
    }
}

export default UserSongsServices