const { Movie } = require("../models");

const getListMovies = async (req, res) => {
  try {
    const userList = await Movie.findAll();
    res.status(200).send(userList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movieDetail = await Movie.findByPk(id);
    console.log(movieDetail);
    if (movieDetail) {
      res.status(200).send(movieDetail);
    } else {
      res.status(400).send("Not Found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const createMovie = async (req, res) => {
  const { name, totalMovieTime, poster, trailer } = req.body;
  try {
    const newMovie = await Movie.create({
      name,
      totalMovieTime,
      poster,
      trailer,
    });
    res.status(201).send(newMovie);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = Movie.findByPk(id);
    if (movie) {
      await Movie.destroy({
        where: {
          id,
        },
      });
      res.status(200).send("delete success");
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { name, totalMovieTime, poster, trailer } = req.body;

  try {
    const movie = Movie.findByPk(id);
    if (movie) {
      upMovie = { ...movie, name, totalMovieTime, poster, trailer };
      await Movie.update(upMovie, {
        where: {
          id,
        },
      });
      res.status(200).send("update success");
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getListMovies,
  getDetailMovie,
  createMovie,
  deleteMovie,
  updateMovie,
};
