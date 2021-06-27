const express = require("express");
const { Movie } = require("../models");
const movieRouters = express.Router();
const {
  getListMovies,
  getDetailMovie,
  deleteMovie,
  createMovie,
  updateMovie,
} = require("../controllers/movie.controllers");
const {
  checkExits,
} = require("../middlewares/validations/checkExist.middlewares");

movieRouters.get("/", getListMovies);
movieRouters.get("/:id", checkExits(Movie), getDetailMovie);
movieRouters.post("/", createMovie);
movieRouters.delete("/:id", checkExits(Movie), deleteMovie);
movieRouters.put("/:id", checkExits(Movie), updateMovie);

module.exports = {
  movieRouters,
};
