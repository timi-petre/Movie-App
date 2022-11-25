import { fetcher } from 'utils/api'

const getVideosMovieUrl = (terms) =>
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}&query=${terms}`

export default async function handler(req, res) {
    const results = await fetcher(getVideosMovieUrl(req.query.terms))

    res.status(200).json(results)
}
