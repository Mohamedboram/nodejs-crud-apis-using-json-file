
const express = require('express');
const Router = express.Router();
const moviesControllers = require('../controller/moviesController.js');
 

Router.param('id', moviesControllers.checkedId)

Router.route("/").get(moviesControllers.getAllMovies).post(moviesControllers.validateBody,moviesControllers.createMovie);
Router
.route("/:id")
.get(moviesControllers.getMovieById)
.patch(moviesControllers.updateMovie)
.delete(moviesControllers.deleteMovie);

module.exports = Router;
