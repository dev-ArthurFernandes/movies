import express, { Application, json } from 'express';
import { startDataBase } from './database';
import {
    getAllMovies,
    getMovieById
} from './logic';
import {
    validateId
} from './middlewares'


const App: Application = express()

const baseURL: string = "/movies"

App.use(json())

App.get(`${baseURL}`, getAllMovies)
App.get(`${baseURL}/:id`, validateId, getMovieById)

App.post(`${baseURL}`)

App.patch(`${baseURL}/:id`, validateId)

App.delete(`${baseURL}/:id`, validateId)


App.listen(3000, async () => {
    await startDataBase()
    console.log("Server is running!")
})