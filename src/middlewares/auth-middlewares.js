import jwt from "jsonwebtoken"

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "Access denied, please provide a valid token" })

  try {
    const decoded = jwt.verify(token, process.env.tokenSec)
    req.user = decoded
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" })
  }
};

export default authenticateUser