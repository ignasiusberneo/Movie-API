const request = require("supertest");
const { Movie } = require("../models/index");
const app = require("../app");

describe("MovieController", () => {
  const movie = {
    title: "Test Movie",
    description: "This is a test movie",
    rating: 7,
    image: "test.jpg",
  };

  beforeEach(async () => {
    await Movie.destroy({ where: {} });
  });

  describe("GET /movies", () => {
    it("should return an empty array when there are no movies", async () => {
      const response = await request(app).get("/movies");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("should return an array of movies when there are movies in the database", async () => {
      await Movie.create(movie);

      const response = await request(app).get("/movies");
      expect(response.status).toBe(200);
    });
  });

  describe("GET /movies/:id", () => {
    it("should return 404 when movie with given id does not exist", async () => {
      const response = await request(app).get("/movies/1");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Movie with ID 1 not found",
      });
    });

    it("should return the movie with the given id", async () => {
      const createdMovie = await Movie.create(movie);

      const response = await request(app).get(`/movies/${createdMovie.id}`);
      expect(response.status).toBe(200);
    });
  });

  describe("POST /movies", () => {
    it("should create a new movie when request body is valid", async () => {
      const response = await request(app).post("/movies").send(movie);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: "Add Movie Success",
      });

      const createdMovie = await Movie.findOne({ where: movie });
      expect(createdMovie).not.toBeNull();
    });

    it("should return an error when request body is invalid", async () => {
      const response = await request(app)
        .post("/movies")
        .send({});

      expect(response.status).toBe(400);
    });
  });

  describe("PATCH /movies/:id", () => {
    it("should return 404 when movie with given id does not exist", async () => {
      const response = await request(app)
        .patch("/movies/1")
        .send(movie);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Movie with ID 1 not found",
      });
    });

    it("should update the movie with the given id", async () => {
      const createdMovie = await Movie.create(movie);

      const response = await request(app)
        .patch(`/movies/${createdMovie.id}`)
        .send({ title: "Updated Movie" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Update Movie Success",
      });

      const updatedMovie = await Movie.findByPk(createdMovie.id);
      expect(updatedMovie.title).toBe("Updated Movie");
    });
  });

  describe("DELETE /movies/:id", () => {
    it("should return 404 when movie with given id does not exist", async () => {
      const response = await request(app).delete("/movies/1");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Movie with ID 1 not found",
      });
    });

    it("should delete the movie with the given id", async () => {
      const createdMovie = await Movie.create(movie);

      const response = await request(app).delete(`/movies/${createdMovie.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Delete Movie Success",
      });

      const deletedMovie = await Movie.findByPk(createdMovie.id);
      expect(deletedMovie).toBeNull();
    });
  });
});
