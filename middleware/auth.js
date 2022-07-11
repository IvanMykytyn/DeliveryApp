import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401);
  }
  const token = authHeader?.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // set req.user.userId
    req.user = { userId: payload.userId }

    next()
  } catch (error) {
    res.status(401);
  }
}

export default auth
