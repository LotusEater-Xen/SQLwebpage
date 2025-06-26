import mysql from 'mysql2'

const pool = mysql.createPool({
    host: "archlinux",
    user: "Lumina",
    password: "Nice42069",
    database: 'cool_things'   
}).promise()

const result = await pool.query("SELECT * FROM things")
console.log(result)