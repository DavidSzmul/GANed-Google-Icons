var gplay = require('google-play-scraper');
const sqlite3 = require('sqlite3').verbose();


// open the database connection
let db = new sqlite3.Database('./db/apps.db');

total = 0
function insert_in_db(result){
    for (idx in result) {
        total = total+1
        // insert a new application on database (cancel if not unique)
        db.run(`INSERT INTO application(title,nameId, devId, icon) VALUES(?,?,?,?)`,
            [result[idx]["title"],result[idx]["appId"],result[idx]["developer"],result[idx]["icon"]],
            function(err) {
                if (err) { 
                    total = total-1;
                    return console.log(err.message);
                }
            });        
    }
    console.log(total)
}

for (idx_collection in gplay.collection){
    for (idx_category in gplay.category){
        const games= gplay.list({
            category: gplay.category[idx_category],
            collection: gplay.collection[idx_collection],
            num: 500
        }).then(insert_in_db,console.log);

        setTimeout(function() {
            console.log('category: '+gplay.category[idx_category]+' collection: '+gplay.collection[idx_collection]);
        }, 1000);
    }
}
// db.close();