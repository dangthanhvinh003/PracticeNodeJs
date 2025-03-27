const express = require("express");
const app = express();

const router = require("./routes/web");
const connection = require("./config/DBconfig");
const mongoose = require("mongoose");
const configViewEngine = require("./config/viewEngine");
const session = require("express-session");

//session config

app.use(
  session({
    secret: "super_secret_123",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

//config get from input
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true }));

//config template
configViewEngine(app);

//Use Router
app.use("/", router);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = 8082;

//async await DB vì db dùng asyn await
(async () => {
  await connection();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
//test connection
