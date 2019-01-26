
class AuthStorageService {

    clearSession(){
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;
        localStorage.removeItem('session');
    }

    getSession(){
        const session = localStorage.getItem('session');
        if (session) {
            return JSON.parse(session);
        }
        
        return null;
    }

    setSession(authResult){
        localStorage.setItem('session', JSON.stringify({
            accessToken: authResult.accessToken,
            idToken: authResult.idToken,
            expiresAt: (authResult.expiresIn * 1000) + new Date().getTime()
        }));
    }
}

export default new AuthStorageService();