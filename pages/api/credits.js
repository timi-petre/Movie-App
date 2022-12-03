import { fetcher } from 'utils/api'

const getCreditsUrl = (id) =>
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}`

export default async function handler(req, res) {
    const movie = await fetcher(getCreditsUrl(req.query.id))

    res.status(200).json(movie)
}
