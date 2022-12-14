import { fetcher } from 'utils/api'

const getPopularUrl = () =>
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`

export default async function handler(req, res) {
    const popular = await fetcher(getPopularUrl())

    res.status(200).json(popular)
}
