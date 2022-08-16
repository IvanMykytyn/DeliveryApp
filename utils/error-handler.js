
const errorHandler = (err, res) => {
  let message = err.message

  // handle validation errors
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
  }

  // handle unique field error
  if (err.code && err.code === 11000) {
    message = `${Object.keys(err.keyValue)} field has to be unique`
  }

  res.status(404).send({ message })
}

export default errorHandler
