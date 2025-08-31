import express from 'express'
import {client} from './database.js'

const app = express()
const port = 2316

app.use(express.json())

app.post('/login', async (request, response) => {
    const login = request.body.login;
    const password = request.body.password

    const row = await client.query('SELECT * FROM users WHERE login = $1 and password = $2', [login, password])

    if(row.rowCount != 0){
        response.status(200).send(`Login successful`)
        return;
    }

    response.status(401).send(`User was not found in database`);
})

app.post('/register', async (request, response) => {
    const login = request.body.login;
    const password = request.body.password

    const row = await client.query('SELECT * FROM users WHERE login = $1', [login])

    if(row.rowCount != 0){
        response.status(409).send(`user already exists`)
        return;
    }

    await client.query('INSERT INTO users(login, password) VALUES($1, $2)', [login, password])
    response.status(201).send(`user is registered successfully`)
})

app.listen(port, () => {
    console.log(`The server is running in port ${port}`)
})