const rooter = require("express").Router();
const controller = require("../controllers");
const middleware = require("../middleware/jwt");

rooter.use(middleware.verifyToken);
rooter.get("/", controller.c_ctrl.courses);
rooter.get("/search", controller.c_ctrl.searchs);
rooter.post("/add", controller.c_ctrl.add);
rooter.delete("/delete", controller.c_ctrl.deleted);

module.exports = rooter;
