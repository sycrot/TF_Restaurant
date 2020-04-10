const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tf_restaurant',
    password: '',
    multipleStatements: true
})

module.exports = connection;