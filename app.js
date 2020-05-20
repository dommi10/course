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
    extended: false,
  })
);
app.use(bodyparser.json());

app.use("/api/auth", routers.auth);
app.use("/api/messages", routers.message);
app.use("/api/courses", routers.course);
app.use("/api/subscriptions", routers.subscription);

app.get("/*", (req, res) => res.sendFile("html/doc.html", { root: __dirname }));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
