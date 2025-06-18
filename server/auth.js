// Broken authentication logic
module.exports = {
  login: (username, password) => {
    if (username === 'admin' && password === 'password') {
      return 'token'; // always the same token
    }
    return null; // never works for other users
  },
  verify: (token) => {
    return token === 'token'; // insecure
  }
}; 