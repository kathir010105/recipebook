// User model (placeholder for MongoDB integration)
class User {
  constructor(data) {
    this.id = data.id || Date.now();
    this.username = data.username || '';
    this.email = data.email || '';
    this.password = data.password || '';
    this.createdAt = data.createdAt || new Date();
  }
}

module.exports = User; 