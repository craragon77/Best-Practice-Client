import config from '../config'

const TokenService = {
    saveAuthToken(token){
        window.localStorage.setItem(config.TOKEN_KEY, token);
    },
    getAuthToken(){
        return window.localStorage.getItem(config.TOKEN_KEY);
    },
    clearAuthToken(){
        window.localStorage.removeItem(config.TOKEN_KEY);
        window.localStorage.removeItem(config.ID_TOKEN);
    },
    hasAuthToken(){
        return !!TokenService.getAuthToken();
    },
    makeBasicAuthToken(username, password){
        return window.btoa(`${username}:${password}`);
    },
    saveUserId(id){
        window.localStorage.setItem(config.ID_TOKEN, id);
    }
};

export default TokenService