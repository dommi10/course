const controller = require("../controllers");
const rooter = require("express").Router();
const middlware = require("../middleware/jwt");

rooter.use(middlware.verifyToken);
rooter.get("/", controller.ctrlSub.subscrition);
rooter.post("/add", controller.ctrlSub.subscribe);

module.exports = rooter;
