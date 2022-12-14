import History from 'models/History'
import dbConnect from 'utils/dbConnect'

export default async function handler(req, res) {
    await dbConnect()
    const history = await History.find()
    if (history.length > 0) {
        res.status(200).json(...history)
    } else {
        res.status(200).json({ data: 'Your history is empty' })
    }
}
