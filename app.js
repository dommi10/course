const express = require("express");
const routers = require("./routers");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const port = process.env.PORT;

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => res.send("Jambo..."));

app.use("/auth", routers.auth);
app.use("/message", routers.message);
app.use("/course", routers.course);
app.use("/subscription", routers.subscription);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
