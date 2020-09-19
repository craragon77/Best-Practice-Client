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
    }
}

export default SongService;