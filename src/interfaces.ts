interface IMovieRequest{
    name: string,
    category: string
    duration: number,
    price: number
}


interface IMovie extends IMovieRequest{
    id: number
}


type validValues = ["name","category","duration","price"]


export {
    IMovieRequest,
    IMovie,
    validValues
}