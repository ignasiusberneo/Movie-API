const express = require("express");
const app = express();
const movieController = require('./controllers/movieController')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/movies', movieController.getMovies)
app.get('/movies/:id', movieController.getMovieById)
app.post('/movies', movieController.addMovie)
app.patch('/movies/:id', movieController.updateMovie)
app.delete("/movies/:id", movieController.deleteMovieById)

module.exports = app;