const express = require("express");
const request = require("request-promise");

const route = express.Router();

route.post("/send", (req, res) => {
  const { number, message } = req.body;
  const title = "MauriceAPI";
  request
    .get(
      `https://api.bulksmsonline.com:9090/smsapi?username=BagaMa452&password=remaurice1kin&type=Y&to=${number}&source=${title}&message=${message}`
    )
    .then((result) => {
      console.log(result);
      res.json({ success: "send" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: "something went wrong" });
    });
});

module.exports = route;
