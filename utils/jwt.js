const jwt = require("jsonwebtoken");
const GenericResponse = require("../payload/GenericResponse");
const secretKey = process.env.JWT_TOKEN;

// Middleware to verify the JWT
function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json(new GenericResponse(401, false, "Access denied", null, null));
  }

  jwt.verify(token.split(" ")[1], secretKey, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json(new GenericResponse(403, false, "Invalid Token", null, err));
    }
    req.user = user;
    next();
  });
}

function decodeToken(req, res) {
  const token = req.header("Authorization");
  return jwt.verify(token.split(" ")[1], secretKey, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json(new GenericResponse(403, false, "Invalid Token", null, err));
    }
    return user;
  });
}

// Function to return jwt
function generateToken(body) {
  return jwt.sign(body, secretKey);
}

module.exports = { generateToken, authenticateToken, decodeToken };
