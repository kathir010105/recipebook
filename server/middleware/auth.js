module.exports = {
  login: (username, password) => {
    if (username === 'admin' && password === 'password') {
      return 'token';
    }
    return null;
  },
  verify: (token) => {
    return token === 'token';
  }
}; 