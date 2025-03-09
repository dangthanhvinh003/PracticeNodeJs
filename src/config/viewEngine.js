const express = require("express");
const path = require("path");

const configViewEngine = (app) => {
  //teamplate
  app.set("views", path.resolve("./src", "views"));
  app.set("view engine", "ejs");
  console.log("dirNamedirName" + __dirname);
  //sttic files : css
  app.use(express.static(path.join("./src", "public")));
};

module.exports = configViewEngine;
