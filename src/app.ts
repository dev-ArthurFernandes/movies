import express, { Application, json } from 'express';
import { startDataBase } from './database';
import {
    getAllMovies,
    getMovieById,
    postMovie,
    patchMovie,
    deleteMovie
} from './logic';
import {
    validateId,
    validateName
} from './middlewares'


const App: Application = express()

const baseURL: string = "/movies"

App.use(json())

App.get(`${baseURL}`, getAllMovies)
App.get(`${baseURL}/:id`, validateId, getMovieById)

App.post(`${baseURL}`, validateName, postMovie)

App.patch(`${baseURL}/:id`, validateId, validateName, patchMovie)

App.delete(`${baseURL}/:id`, validateId, deleteMovie)


App.listen(3000, async () => {
    await startDataBase()
    console.log("Server is running!")
})