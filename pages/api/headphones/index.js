import createHandler from 'server/middleware/index'
import Headphone from 'server/models/products/headphone'

const handler = createHandler()

handler.get(async (req, res ) => {
    const headphones = await Headphone.find({}).exec()
    res.status(200).json(headphones)
})

export default handler