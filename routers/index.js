const auth = require("./auth");
const router = require("./router");
const course = require("./course");
const message = require("./message");
const subscription = require("./subscription");
const payment = require("./payment");

module.exports = {
  auth,
  router,
  message,
  course,
  subscription,
  payment,
};
