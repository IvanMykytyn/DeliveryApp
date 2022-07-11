export default (req, res, next) => {
        try {
            // Get user input
            const { email, password} = req.body;

            // Validate user input
            if (!(email && password)) {
                res.status(400).send({message: 'all input is required'})
                res.end()
            } else {
                next()
            }
        } catch (e) {
            res.status(500).send({message: e.message})
            res.end()
        }

    }