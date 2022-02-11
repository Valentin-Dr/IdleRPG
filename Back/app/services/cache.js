const {createClient} = require('redis');
const db = createClient();
db.connect();

module.exports = db;