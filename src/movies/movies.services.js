const { host } = require("../../config");
const moviesControllers = require("./movies.controllers");

const getAllMovies = (req, res) => {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;

  moviesControllers
    .findAllMovies(limit, offset)
    .then((data) => {
      const nextPageUrl =
        data.count - offset > limit
          ? `${host}/api/v1/movies?limit=${limit}&offset=${offset + limit}`
          : null;
      const prevPageUrl =
        offset - limit >= 0
          ? `${host}/api/v1/movies?limit=${limit}&offset=${offset - limit}`
          : null;

      res.status(200).json({
        count: data.count,
        next: nextPageUrl,
        prev: prevPageUrl,
        results: data.rows,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const getMovieById = (req, res) => {
  const id = req.params.id;
  moviesControllers
    .findMoviesById(id)
    .then((data) => {
      //? En caso de que data no exista (la movie no exista)
      if (!data) {
        return res
          .status(404)
          .json({ message: `Movie with id: ${id}, not found` });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const postNewMovie = (req, res) => {
  const movieObj = req.body;
  moviesControllers
    .createMovies(movieObj)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const patchMovie = (req, res) => {
  const id = req.params.id;
  const movieObj = req.body;

  moviesControllers
    .updateMovie(id, movieObj)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Invalid ID" });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const deleteMovie = (req, res) => {
  const id = req.params.id;
  moviesControllers
    .deleteMovie(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Invalid ID" });
      }
      res.status(204).json();
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

module.exports = {
  getAllMovies,
  getMovieById,
  postNewMovie,
  patchMovie,
  deleteMovie,
};
