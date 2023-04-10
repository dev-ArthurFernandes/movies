import { Request, Response, query } from "express";
import { client } from "./database";
import { QueryConfig, QueryResult } from "pg";
import { IMovie, IMovieRequest } from "./interfaces";
import format from "pg-format";


const getAllMovies = async(req: Request, res: Response): Promise<Response> => {

    var queryString: string = ``

    var queryConfig: QueryConfig = {
        text: queryString,
        values: []
    }
    
    var queryResult: any | QueryResult = ''

    if(req.query.category){
        queryString = `
        SELECT
            *
        FROM
            movies
        WHERE
            category = $1
        `

        queryConfig = {
            text: queryString,
            values: [req.query.category]
        }

        queryResult = await client.query(queryConfig)

    }else{
        queryString = `
            SELECT
                * 
            FROM
                movies;    
        `
        queryResult = await client.query(queryString)
    }

    
    return res.json(queryResult.rows)
}

const getMovieById = async (req: Request, res: Response): Promise<Response> => {

    const queryString: string = `
        SELECT
            *
        FROM
            movies
        WHERE
            id = $1;   
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.id]
    }

    const queryResult = await client.query(queryConfig)

    return res.json(queryResult.rows[0])
}

const postMovie = async (req: Request, res: Response): Promise<Response> => {

    const movieData: IMovieRequest = req.body

    const queryString: string = format(`
        INSERT INTO
            movies(%I)
        VALUES(%L)
        RETURNING *;
    `,
        Object.keys(movieData),
        Object.values(movieData)
    )

    return res.status(201).json((await client.query(queryString)).rows[0])
}

const patchMovie = async (req: Request, res: Response): Promise<Response> => {

    const movieData: IMovieRequest = req.body

    const movieId: number = parseInt(req.params.id)

    const queryString: string = format(`
        UPDATE
            movies
        SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING *;
    `,
        Object.keys(movieData),
        Object.values(movieData)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [movieId]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    return res.json(queryResult.rows[0])

}

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {

    const movieID: number = parseInt(req.params.id)

    const queryString: string = `
        DELETE FROM
            movies
        WHERE
            id = $1;    
    `

    const queryConfing: QueryConfig = {
        text: queryString,
        values: [movieID]
    }

    await client.query(queryConfing)

    return res.status(204).send()
}

export {
    getAllMovies,
    getMovieById,
    postMovie,
    patchMovie,
    deleteMovie
}