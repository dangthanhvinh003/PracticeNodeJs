import express from "express";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const configViewEngine = (app) => {
  //template
  app.set("views", resolve(__dirname, "../View"));
  app.set("view engine", "ejs");
  console.log("dirNamedirName: " + __dirname);
  //static files : css
  app.use(express.static(join(__dirname, "../public")));
};

export default configViewEngine;