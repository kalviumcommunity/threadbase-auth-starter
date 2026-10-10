import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
  // Task 1: Read the token — extract after "Bearer "
  const token = req.headers.authorization?.split(' ')[1];

  // Task 3: Reject missing token with 401 immediately
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Task 2: Verify the token and attach the decoded payload to req.user
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, role, iat, exp }
    next();
  } catch (err) {
    // Task 3: Reject invalid / expired tokens with 401
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
