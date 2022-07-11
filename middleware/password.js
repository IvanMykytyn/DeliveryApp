// length 8-25 characters,
// min 1 upperCase character,
// min 1 lowercase character,
// withoutSpaces
// min 1 digit

import passwordValidator from 'password-validator';
let passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8, "password must have at least 8 characters")
    .is().max(25, "password must be no more than 25 characters")
    .has().uppercase(1, "password must have at least 1 uppercase character")
    .has().lowercase(1, "password must have at least 1 lowercase character")
    .has().digits(1, "password must have at least 1 digit")
    .has().not().spaces(0, "password should not include spaces")

export default (req, res, next) => {
        try {
            const {password} = req.body
            let isValid = passwordSchema.validate(password) // true or false

            if (typeof (password) !== "string") {
                res.status(400).send({message: 'password must be a string'})
                res.end()

            } else if (!isValid) {
                // array of objects {details: true}
                let validationData = passwordSchema.validate(password, {details: true})
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