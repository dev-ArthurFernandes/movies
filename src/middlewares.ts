import {
    Request,
    Response,
    NextFunction
} from 'express'
import { QueryConfig } from 'pg'
import { client } from './database'


const validateId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

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

    if(queryResult.rowCount === 0){
        return res.status(404).json({
            error: "Movie not found!"
        })
    }

    return next()
}

const validateName = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const queryString: string = `
        SELECT
            *
        FROM
            movies
        WHERE
            name = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.body.name]
    }

    const queryResult = await client.query(queryConfig)

    if(queryResult.rowCount === 1){
        return res.status(409).json({
            error: "Movie name already exists!"
        })
    }

    return next()
}

export {
    validateId,
    validateName
}