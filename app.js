const express = require("express");
const app = express();
app.use(express.json());

const moviesRouter = require('./Routes/moviesRoutes.js');
app.use('/api/v1/movies/', moviesRouter)



module.exports = app


// morgan = require('morgan');

/* app.use((req,res,next)=> {
  req.requestedAt = new Date().toISOString();
  next();
})

app.use(morgan('dev')) */

/* const logger = (req, res, next) => {
  console.log("custom middleware called");
  next();
};
app.use(logger); */

// adding middleware to attach the request body to the request 

// ROUTE = HTTP METHOD + URL


// api/v1/movies = GET requests -- get all movies

/* app.get("/api/v1/movies/", getAllMovies);

app.get("/api/v1/movies/:id/", getMovieById);

app.patch("/api/v1/movies/:id/", updateMovie);

app.delete("/api/v1/movies/:id/", deleteMovie);

app.post("/api/v1/movies/", createMovie); */