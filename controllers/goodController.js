//models
import Good from "../models/Good.js";

const goodController = async (req,res) => {
    const {shopId: id} = req.params
    const goods = await Good.find({shopId: id})
    
    res.status(200).json(goods);
}

export {goodController}