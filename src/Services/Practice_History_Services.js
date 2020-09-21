import TokenService from './TokenService';
import config from '../config';

const PracticeHistoryServices = {
    postPracticeHistorySesson(token, post){
        return fetch(`${config.API_ENDPOINT}/api/practice-history`, {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${token}`,
                'content-type': 'application/json'
            },
            body: post
        })
    }
}

export default PracticeHistoryServices
