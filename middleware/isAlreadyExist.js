import User from '../models/User.js' 

export default async (req, res, next) =>  {
        try {
            const email = req.body.email;

            // check if user already exist
            // Validate if user exist in our database
            const oldUser = await User.findOne({email});
            if (oldUser) {
                res.status(400).send({message: "User Already Exist."})
                res.end()
            } else {
                next()
            }
        } catch (e) {
            res.status(500).send({message: e.message})
            res.end()
        }

    }
