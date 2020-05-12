const express = require("express");
const routers = require("./routers");
const bodyparser = require("body-parser");

const app = express();
const port = 5200;

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => res.send("Jambo..."));

app.use("/auth", routers.auth);
app.use("/app", routers.router);
app.use("/message", routers.message);
app.use("/course", routers.course);
app.use("/sub", routers.subscription);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
