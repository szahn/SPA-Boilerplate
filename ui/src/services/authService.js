import auth0 from 'auth0-js';

import authOptions from '../auth0Options.js'
import AuthStorageService from './authStorageService';
import history from '../history';

class AuthService {

    constructor(){
        const environment = "dev";
        this.auth0 = new auth0.WebAuth({
            domain: authOptions[environment].domain,
            clientID: authOptions[environment].clientID,
            redirectUri: authOptions[environment].redirectUri,
            responseType: 'token id_token',
            scope: 'openid'
        });
    }

    login(){
        this.auth0.authorize();
    }

    logout(redirectUrl = '/home'){
        AuthStorageService.clearSession();
        history.replace(redirectUrl);        
    }

    handleAuthentication(successRedirectUrl = '/home', failRedirectUrl = '/home'){
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                AuthStorageService.setSession(authResult);
                history.replace(successRedirectUrl);
            } else if (err) {
              history.replace(failRedirectUrl);
              console.log(err);
              alert(`Error: ${err.error}. Check the console for further details.`);
            }
          });
    }

    isAuthenticated() {
        const session = AuthStorageService.getSession();
        if (!session) return false;
        const {expiresAt} = session;
        return expiresAt && new Date().getTime() < expiresAt;
    }

    getAccessToken(){
        const session = AuthStorageService.getSession();
        if (!session) return false;
        const {accessToken} = session;
        return accessToken;
    }

    getIdToken(){
        const session = AuthStorageService.getSession();
        if (!session) return false;
        const {idToken} = session;
        return idToken;

    }

    renewSession(){
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                AuthStorageService.setSession(authResult);
            } else if (err) {
              this.logout();
              console.log(err);
              alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
            }
         });        
    }

}

export default AuthService;
