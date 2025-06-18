// Recipe model (placeholder for MongoDB integration)
class Recipe {
  constructor(data) {
    this.id = data.id || Date.now();
    this.title = data.title || '';
    this.description = data.description || '';
    this.author = data.author || '';
    this.createdAt = data.createdAt || new Date();
  }
}

module.exports = Recipe; 