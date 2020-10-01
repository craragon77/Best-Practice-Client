import config from '../config';

const AuthApiService = {
    postLogin(creds){
        return fetch(`${config.API_ENDPOINT}/api/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(creds)
        })
    }
}

export default AuthApiService;