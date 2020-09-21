import TokenService from './TokenService';
import config from '../config';

const PracticeHistoryServices = {
    postPracticeHistorySesson(token, post){
        return fetch(`${config.API_ENDPOINT}/api/practice-history`, {
            method: 'POST',
            headers: {
                //'authorization': `bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        })
    }
}

export default PracticeHistoryServices
