const jwt = require("jsonwebtoken");

const protected = async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }
  if (!token) {
    return res.status(401).json({ success: false, message: "You are not authorized for this action!" })
  }
  try{
    const decoded = jwt.verify(token, 'secret')
    const user = decoded
    req.user = user
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "You are not authorized for this action!" })
  }
}

module.exports = protected;
