const { expressjwt: jwt } = require("express-jwt");

const isRevoked = async (req, jwt) => {
  const payload = jwt.payload;
  if (!payload.isAdmin) {
    return true;
  }
  return false;
};
const authJwt = () => {
  const api = process.env.API_URL;
  return jwt({
    secret: process.env.ACCES_TOKEN_SECRET,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: `${api}/products`, methods: ["GET", "OPTIONS"] },
      `${api}/auth/login`,
      `${api}/users/register`,
    ],
  });
};

module.exports = authJwt;
