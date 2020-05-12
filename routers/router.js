const controller = require("../controllers");
const middleware = require("../middleware/jwt");

const rooter = require("express").Router();

rooter.use(middleware.verifyToken);

rooter.get("/", controller.ctrl.users);

rooter.post("/update", controller.ctrl.update);

rooter.post("/add", controller.c_ctrl.add);
rooter.post("/course/update", controller.c_ctrl.update);

module.exports = rooter;
