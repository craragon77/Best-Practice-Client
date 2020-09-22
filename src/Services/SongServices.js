import TokenService from './TokenService';
import config from '../config';

const SongService = {
    getAllSongs(){
        return fetch(`${config.API_ENDPOINT}/api/songs`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        });
    },
    getSongById(id, token){
        return fetch(`${config.API_ENDPOINT}/api/songs/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        });
    },
    getSongHistory(id, token){
        return fetch(`${config.API_ENDPOINT}/api/user-songs/songHistory/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        });
    },
    getSongInfo(id, token){
        return fetch(`${config.API_ENDPOINT}/api/user-songs/getInfoBySongId/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
    },
    getSongByTitle(token, query){
        return fetch(`${config.API_ENDPOINT}/api/songs/byName/${query}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
    },
    postNewSong(token, song){
        return fetch(`${config.API_ENDPOINT}/api/songs`, {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(song)
        })
    }
}

export default SongService;