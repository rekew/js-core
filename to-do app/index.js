import {client} from "./database.js"
import express from 'express'

const app = express()
const port = 2316

app.use(express.json())

app.get('/', (request, response) => {
    response.send("check")
})

app.post('/', async (request, response) => {

    console.log('request it self:', request.body)

    if (request.body.is_done){

        const db_response = await client.query(`
            SELECT * FROM tasks where task_name = $1
        `, [request.body.task_name])

        if(db_response.rowCount == 0){
            response.status(400).send(`task doesn't exist`)
            return;
        }

        await client.query(`
            UPDATE tasks SET 
                done = true where task_name = $1
        `, [request.body.task_name])
    }

    await client.query(`
        INSERT INTO tasks(task_name) VALUES ($1)    
    `, [request.body.task_name])

    response.send('got the request')
})

app.listen(port, () => {
    console.log(`port ${port} connection is stable`)
})