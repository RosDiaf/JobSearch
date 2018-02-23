export class AuthService {
    loggedIn = false;

    isAuthenticated() {
        const promise = new Promise(
        (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                    console.log(this.loggedIn);
                }, 800);
            }
        );
        console.log(promise);
        return promise;
    }

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }
}
  