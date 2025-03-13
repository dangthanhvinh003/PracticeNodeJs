const express = require("express");
const app = express();

const router = require("./router/web");
const connection = require("./config/DBconfig");
const mongoose = require("mongoose");
const configViewEngine = require("./config/viewEngine");

//config get from input
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true }));

//config template
configViewEngine(app);

//Use Router
app.use("/", router);

const PORT = 8082;

//async await DB vì db dùng asyn await
(async () => {
  await connection();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
//test connection
