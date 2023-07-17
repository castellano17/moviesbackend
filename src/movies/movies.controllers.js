const Category = require("../models/category.models");
const Movies = require("../models/movies.models");
const uuid = require("uuid");

const findAllMovies = async (limit, offset) => {
  const movies = await Movies.findAndCountAll({
    limit: limit,
    offset: offset,
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [{ model: Category, attributes: ["nameCategory"] }],
  });
  return movies;
};

const findMoviesById = async (id) => {
  const data = await Movies.findOne({
    where: {
      id: id,
    },
  });
  return data;
};

const createMovies = async (movieObject) => {
  const newMovie = {
    id: uuid.v4(),
    name: movieObject.name,
    categoryId: movieObject.categoryId,
  };
  const data = await Movies.create(newMovie);
  return data;
};

const updateMovie = async (id, movieObj) => {
  const selectedMovie = await Movies.findOne({
    where: {
      id: id,
    },
  });

  if (!selectedMovie) return null;

  const modifiedMovie = await selectedMovie.update(movieObj);
  return modifiedMovie;
};

const deleteMovie = async (id) => {
  const movie = await Movies.destroy({
    where: {
      id: id,
    },
  });
  return movie;
};

module.exports = {
  findAllMovies,
  findMoviesById,
  createMovies,
  updateMovie,
  deleteMovie,
};
