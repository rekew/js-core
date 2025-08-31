import {Client} from "pg"

export const client = new Client({
    user: 'postgres',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'authentication_system'
})

await client.connect()

await client.query(`
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        login VARCHAR(50) NOT NULL,
        password VARCHAR(50)
    )    
`)