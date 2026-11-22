//1. Read the token — write verifyToken (2 marks) Run npm install (the starter already lists jsonwebtoken as a dependency, since the login scaffold uses it to sign tokens). Create middleware/verifyToken.js and import jwt from 'jsonwebtoken'. The middleware must read the Authorization header and extract the token after Bearer (split on the space, take index 1; use optional chaining so a missing header does not crash).

//2. Verify the token and attach the user (2 marks) Inside a try/catch, call jwt.verify(token, process.env.JWT_SECRET). On success, assign the decoded payload to req.user and call next().

//3. Reject missing and invalid tokens with 401 (2 marks) If no token is present, return 401 immediately (before verifying). If jwt.verify throws (invalid signature or expired token), the catch block must also return 401. Every failure path ends in a 401.

//4. Protect the write routes, keep reads public (2 marks) Apply verifyToken to POST, PUT, and DELETE /api/threads (place it before the handler). Leave GET /api/threads public — no guard on reads.

//5. Add GET /api/me (2 marks) Add a protected route GET /api/me that applies verifyToken and simply returns req.user (the decoded payload). This proves the whole chain works end to end.

import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;      // { userId, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
