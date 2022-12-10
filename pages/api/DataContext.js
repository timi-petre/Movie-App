import { createContext, useState } from 'react'

const DataContext = createContext()

export const DataProvider = (props) => {
    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState([])

    const handleSearch = (e) => {
        setSearch(e.target.value)
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${e.target.value}&page=1`,
        )
            .then((res) => res.json())
            .then((data) => setMovies(data))
    }

    const handlePageChange = (page) => {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${search}&page=${page}`,
        )
            .then((res) => res.json())
            .then((data) => {
                setMovies(data)
            })
    }
    return (
        <DataContext.Provider
            value={{ handleSearch, movies, handlePageChange }}
        >
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContext
