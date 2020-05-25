export const Auth = {
  login(email, pass, cb) {
    setTimeout(() => {
      if(email === 'vue@example.com' && pass === 'vue') {
        localStorage.token = Math.random().toString(36).substring(7);
        if(cb) {
          cb(true);
        }
      } else {
        if(cb) {
          cb(false);
        }
      }
    }, 0);
  },
  logout() {
    delete localStorage.token;
  },
  loggedIn() {
    return !!localStorage.token;
  }
}