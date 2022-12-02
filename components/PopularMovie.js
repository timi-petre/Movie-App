import MovieCard from './MovieCard'

function PopularMovie({ movies }) {
    return (
        <div>
            {movies?.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
    )
}

export default PopularMovie
