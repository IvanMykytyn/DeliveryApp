import validator from 'email-validator'

export default (req, res, next) => {
  try {
    let { email } = req.body
    let isValid = validator.validate(email)
    if (!isValid) {
      res.status(400).send({ message: 'bad email' })
      res.end()
    } else {
      next()
    }
  } catch (e) {
    res.status(500).send({ message: e.message })
    res.end()
  }
}
