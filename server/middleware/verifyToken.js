import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // Reject requests without a token
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify the JWT using the secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user information to the request
    req.user = decoded;

    // Continue to the next handler
    next();
  } catch (err) {
    // Reject invalid or expired tokens
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}