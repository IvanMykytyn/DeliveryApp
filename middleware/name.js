import passwordValidator from 'password-validator';
let firstNameSchema = new passwordValidator();

firstNameSchema
    .is().min(1, "first name must have at least 1 character")
    .is().max(25, "first name must be no more than 25 characters")
    .has().not().digits(0, "first name should not include digits")
    .has().not().spaces(0, "first name should not include spaces")
    .has().not().symbols(0, "first name should not include special symbols")


export default (req, res, next) => {
        try {
            const {name} = req.body
            let isValid = firstNameSchema.validate(name) // true or false

            if (typeof (name) !== "string") {

                res.status(400).send({message: "first name must be a string"})
                res.end()

            } else if (!isValid) {
                // array of objects {details: true}
                let validationData = firstNameSchema.validate(name, {details: true})
                // filter it
                let responseData = validationData.map((item) => {
                    return item.message
                })

                res.status(400).send({message: responseData[0]})
                res.end()

            } else {
                next()
            }
        } catch (e) {
            res.status(500).send({message: e.message})
            res.end()
        }

    }
