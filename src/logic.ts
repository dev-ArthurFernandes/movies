import { Request, Response, query } from "express";
import { client } from "./database";
import { QueryConfig } from "pg";


const getAllMovies = async(req: Request, res: Response): Promise<Response> => {

    var queryString: string = ``

    var queryConfig: QueryConfig = {
        text: queryString,
        values: []
    }
    
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
    }else{
        queryString = `
            SELECT
                * 
            FROM
                movies;    
        `
    }

    const queryResult = await client.query(queryConfig)

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


export {
    getAllMovies,
    getMovieById
}