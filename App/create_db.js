const sqlite3 = require('sqlite3').verbose();

// open the database connection
let db = new sqlite3.Database('./db/apps.db');

db.run('CREATE TABLE application('+
    'title TEXT,'+
    'nameId TEXT UNIQUE,'+
    'devId TEXT,'+
    'icon TEXT'+
    ')');

db.run('CREATE TABLE develloper('+
'devId TEXT UNIQUE'+
')');

db.close();