
import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  // 1. Extract token from Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // 2. Reject missing token
  if (!token) {
    return res.status(401).json({
      error: "No token provided"
    });
  }

  try {
    // 3. Verify JWT using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach decoded user to request
    req.user = decoded;

    // 5. Continue to next middleware/handler
    next();

  } catch (err) {
    // 6. Reject invalid or expired token
    return res.status(401).json({
      error: "Invalid or expired token"
    });
  }
}
