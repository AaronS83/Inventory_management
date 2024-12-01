import mysql from "mysql2";

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"rootSQL",
    database:"inventory"
});

// const db = mysql.createConnection({
//     host: 'inventory-manager.chqa28cqgixl.eu-north-1.rds.amazonaws.com',
//     user: 'aaron',
//     password: 'Thi$isOraCle1',
//     database: 'inventory'
// });
db.connect((err)=>{
    if(err) console.log(err);
    console.log("Connected to backend database at port 8800")
})

export default db;