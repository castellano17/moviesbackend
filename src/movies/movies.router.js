const router = require("express").Router();
const moviesServices = require("./movies.services");

router
  .route("/")
  .get(moviesServices.getAllMovies)
  .post(moviesServices.postNewMovie);

router
  .route("/:id")
  .get(moviesServices.getMovieById)
  .patch(moviesServices.patchMovie)
  .delete(moviesServices.deleteMovie);

module.exports = router;
