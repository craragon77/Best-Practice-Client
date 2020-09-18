import TokenService from './TokenService';
import config from '../config';

const SongService = {
    getAllSongs(){
        return fetch(`${config.API_ENDPOINT}/api/users`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
    }
}