import {Client} from "pg";

export const client = new Client({
    user: 'postgres',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'to_do_app_nodejs'
})

await client.connect()

const result = await client.query(`
    CREATE TABLE IF NOT EXISTS tasks(
        id SERIAL PRIMARY KEY,
        task_name VARCHAR(50) NOT NULL,
        created_now TIMESTAMP DEFAULT NOW() 
    );
`)

console.log(result.command);