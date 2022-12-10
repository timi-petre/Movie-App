import { fetcher } from 'utils/api'

const getPagesMovieUrl = (terms, page) =>
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${terms} &page=${page}`

export default async function handler(req, res) {
    const results = await fetcher(
        getPagesMovieUrl(req.query.terms, req.query.page),
    )

    res.status(200).json(results)
}
