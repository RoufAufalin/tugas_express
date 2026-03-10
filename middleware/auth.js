const { decodeToken } = require("../helper/token")
const userModel = require("../models/usersModel")

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization

  //   console.log(authHeader)

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header is required",
    })
  }

  const [scheme, token] = authHeader.split(" ")

  try {
    const decodedToken = await decodeToken(token)
    req.userId = decodedToken.id

    

    return next()
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
      err: err,
    })
  }
}

module.exports = {
  authentication,
}
