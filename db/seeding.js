var pool = require('../config.js');
var fs = require('fs');

const seedQuery = fs.readFileSync('./seeding.sql', { encoding: 'utf-8' });
pool.query(seedQuery, (err, res) => {
    console.log(err, res);
    console.log('seeding complete');
    pool.end();
});