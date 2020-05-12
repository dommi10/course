const auth = require("./auth");
const router = require("./router");
const course = require("./course");
const message = require("./message");
const subscription = require("./subscription");

module.exports = {
  auth,
  router,
  message,
  course,
  subscription,
};
