import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
  const secretKey = process.env.SECRET_KEY
  if (token) {
    try {
      const decodedToken = jwt.verify(token, secretKey)

      req.userId = decodedToken._id
      next()
    } catch (error) {
      return res.status(403).json({
        message: 'No access'
      })
    }
  } else {
    return res.status(403).json({
      message: 'No access'
    })
  }
}
