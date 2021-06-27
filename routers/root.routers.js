const express = require("express");
const { movieRouters } = require("./movie.routers");
const rootRouter = express.Router();

rootRouter.use("/movies", movieRouters);

module.exports = {
  rootRouter,
};
