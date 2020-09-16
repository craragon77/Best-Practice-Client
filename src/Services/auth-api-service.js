import config from '../config';

const AuthApiService = {
    postLogin(creds){
        console.log(config.API_ENDPOINT)
        return fetch(`${config.API_ENDPOINT}/api/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(creds)
        })
    }
}

//import this into the login when you get around to it

export default AuthApiService;