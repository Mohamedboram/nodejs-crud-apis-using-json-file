/* Route handler functions */
const fs = require("fs");
const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

exports.validateBody = (req, res, next) => {
  if(!req.body.name || !req.body.releaseYear){
    return res.status(400).json({
      status: "fail",
      message: "name and releaseYear are required and cannot be empty"
    })
  }
  next();
};
exports.checkedId = (req, res, next, value) => {
  console.log("movie ID is " + value);

  const movie = movies.find((movie) => movie.id === value * 1);

  // send the movie with the response for the user

  if (!movie) {
    return res.status(404).json({
      status: "error",
      message: "no movie found with the specified id " + value,
    });
  }

  next();
};

exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: "Success",
    requestedAt: req.requestedAt,
    count: movies.length,
    data: {
      movies,
    },
  });
};

exports.getMovieById = (req, res) => {
  const id = req.params.id * 1;

  //FIND MOVIE BASED ON ID PARAMETER
  let movie = movies.find(el => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
        movie: movie
    }
});
};

exports.updateMovie = (req, res) => {
  let id = +req.params.id;

  // Find the movie object by its id
  let movieToUpdate = movies.find((movie) => movie.id === id);

  // If the movie is not found, return a 404 error
  // if (!movieToUpdate) {
  //   return res.status(404).json({
  //     status: "404 Not Found",
  //     message: `${id} is an invalid id`,
  //   });
  // }

  // Find the index of the movie in the array
  let index = movies.indexOf(movieToUpdate);

  // Update the movie object with the new data from req.body
  Object.assign(movieToUpdate, req.body);

  // Overwrite the old movie in the array with the updated one
  movies[index] = movieToUpdate;

  // Write the updated array back to the JSON file
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (error) => {
    if (error) {
      return res.status(500).json({
        status: "error",
        message: "Failed to update the movie data",
      });
    }

    // If the file was written successfully, send a success response
    res.status(200).json({
      status: "modified successfully",
      data: {
        movie: movieToUpdate,
      },
    });
  });
};

exports.deleteMovie = (req, res) => {
  const id = +req.params.id;

  let movieToDelete = movies.find((movie) => movie.id === id);
  // if (!movieToDelete) {
  //   return res.status(404).json({ status: "404 Not Found" });
  // }

  let index = movies.indexOf(movieToDelete);

  movies.splice(index, 1);
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (error) => {
    res.status(204).json({
      status: "deleted successfully",
      data: {
        movies: null,
      },
    });
  });
};

exports.createMovie = (req, res) => {
  //console.log(req.body);
  const newId = movies[movies.length - 1].id + 1;
  const newMovie = Object.assign({ id: newId }, req.body);
  movies.push(newMovie);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err, data) => {
    res.status(201).json({
      status: "added new movie Successfully",
      data: {
        movie: newMovie,
      },
    });
  });
};
