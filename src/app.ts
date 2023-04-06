import express, { Application, json } from 'express';


const App: Application = express()

App.use(json())




App.listen(3000, () => {
    console.log("Server is running!")
})