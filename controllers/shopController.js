//models
import Shop from '../models/Shop.js'

const shopsController = async (req, res) => {
  const shops = await Shop.find()
  
  res.status(200).json(shops)
}
export { shopsController }
