const { Movie } = require("../models/index");

class MovieController {
    static async getMovies(req, res) {
        try {
            const movies = await Movie.findAll();
            res.status(200).json(movies);
        } catch (error) {
            console.log(error);
        }
    }

    static async getMovieById(req, res) {
        try {
            const { id } = req.params;
            const movie = await Movie.findByPk(id);
            if (!movie) {
                return res.status(404).json({
                    message: `Movie with ID ${id} not found`,
                });
            }
            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }

    static async addMovie(req, res) {
        try {
            const { title, description, rating, image } = req.body;
            await Movie.create({
                title,
                description,
                rating,
                image,
            });
            res.status(201).json({
                message: "Add Movie Success",
            });
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({
                    message: error.errors[0].message,
                });
            } else {
                res.status(500).json({
                    message: "Internal Server Error",
                });
            }
        }
    }

    static async updateMovie(req, res) {
        try {
            const { id } = req.params;
            const { title, description, rating, image } = req.body;
            const movie = await Movie.findByPk(id);
            if (!movie) {
                return res.status(404).json({
                    message: `Movie with ID ${id} not found`,
                });
            }
            await movie.update({
                title,
                description,
                rating,
                image,
            });
            res.status(200).json({
                message: "Update Movie Success",
            });
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({
                    message: error.errors[0].message,
                });
            } else {
                res.status(500).json({
                    message: "Internal Server Error",
                });
            }
        }
    }

    static async deleteMovieById(req, res) {
        try {
            const { id } = req.params;
            const movie = await Movie.findByPk(id);
            if (!movie) {
                return res.status(404).json({
                    message: `Movie with ID ${id} not found`,
                });
            }
            await movie.destroy();
            res.status(200).json({
                message: "Delete Movie Success",
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
}

module.exports = MovieController;