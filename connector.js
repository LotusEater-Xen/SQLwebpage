import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

//select the list specified in .env
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

//get things in list 
export async function getThings() {
const [rows] = await pool.query("SELECT * FROM things")
return rows 
}

//get specific thing from list
export async function getThing(id){
const [rows] = await pool.query(`
SELECT * 
FROM things
WHERE id = ?`, [id])
return rows[0]

}

//add specific thing to list and print out that thing
export async function createThing(title, contents) {
    const [result] = await pool.query(`
    INSERT INTO things (title, contents)
    VALUES(?, ?)
    `, [title, contents])
    const id = result.insertId
    return getThing(id)
}
//print out things in list 
//const things = await getThing(1)
//console.log(things)

//add test object to list  
//const result = await createThing('test', 'test')
//console.log(result)
