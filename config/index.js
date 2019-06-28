module.exports = {
  database: {
    url: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    options: {
      useNewUrlParser: true
    }
  }
};
