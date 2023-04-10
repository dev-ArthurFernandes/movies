import { Client } from "pg";


const client: Client = new Client({
    user: "arthur",
    password: "addagio244",
    host: "localhost",
    database: "postgres",
    port: 5432
})

const startDataBase = async () => {
    await client.connect()
    console.log("DataBase connected!")
}

export {
    client,
    startDataBase
}