import { fetcher } from 'utils/api'

const getSerieUrl = (id) =>
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}`

export default async function handler(req, res) {
    const serie = await fetcher(getSerieUrl(req.query.id))

    res.status(200).json(serie)
}
