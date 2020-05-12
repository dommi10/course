const express = require("express");
const controller = require("../controllers");

const rooter = express.Router();

rooter.post("/sign", controller.ctrl.login);

rooter.post("/signup", controller.ctrl.adduser);

module.exports = rooter;
