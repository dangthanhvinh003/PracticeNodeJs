import express, { json, urlencoded } from "express";
import router from "./routes/web.js";
import connection from "./config/DBconfig.js";
import configViewEngine from "./config/viewEngine.js";
import session from "express-session";

const app = express();

app.use(
  session({
    secret: "super_secret_123",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

//config get from input
app.use(json()); // for json
app.use(urlencoded({ extended: true }));

//config template
configViewEngine(app);

//Use Router
app.use("/", router);

const PORT = 8082;

//async await DB vì db dùng async await
(async () => {
  await connection();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();

//test connection
