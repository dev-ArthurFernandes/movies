import express, { Application, json } from 'express';
import { startDataBase } from './database';


const App: Application = express()

const baseURL: string = "movies"

App.use(json())

App.get(`${baseURL}`)
App.get(`${baseURL}/:id`)

App.post(`${baseURL}`)

App.patch(`${baseURL}/:id`)

App.delete(`${baseURL}/:id`)


App.listen(3000, async () => {
    await startDataBase()
    console.log("Server is running!")
})