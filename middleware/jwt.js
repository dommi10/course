const jwt = require("jsonwebtoken");
module.exports = {
  verifyToken: function (req, res, next) {
    if (!req.headers.authorization)
      res.status(403).json({ error: "invalid token" });
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "motcle", (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(403).json({ error: "invalid token" });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  },
};