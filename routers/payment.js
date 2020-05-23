const express = require("express");
const jwt = require("../middleware/jwt");
const controller = require("../controllers");

const router = express.Router();

router.use(jwt.verifyToken);

router.get("/secret", controller.payment.payment);
router.post("/charge", controller.payment.charge);

module.exports = router;
