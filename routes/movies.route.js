import express from "express";
import { auth } from "../middleware/auth.js";
import { getAllMovies, getMovieById, addMovie, deleteMovieById, editMovieById } from "../services/movies.service.js";

const router = express.Router();

// /movies - display all movie data
// while sending - converts to JSON
// app.get("/movies", function (request, response) {
//   response.send( movies );
// });
router.get("/", async function (request, response) {
    // db.movies.find({ language : "tamil" , name : "Vikram" })  // gets movie from local
    if(request.query.rating) {
      request.query.rating = +request.query.rating;
    }
    console.log(request.query)
    // cursor -> pagination | toArray
    const movies = await getAllMovies(request);
    response.send( movies );
  });
  
  
  // /movies/:id
  router.get("/:id", async function (request, response) {
    const {id} = request.params;
    // db.movies.findOne({id: "101"})
    console.log (id)
    // use find instead of filter to get only object
    // const movie = movies.filter((mv) => mv.id == id)[0]
    // const movie = movies.find((mv) => mv.id == id)
    const movie = await getMovieById(id);
    console.log(movie);
    movie 
      ? response.send( movie ) 
      : response.status(404).send({ msg: "No data found" });
  });
  
  
  // Create
  router.post("/", async function (request, response) {
    const data = request.body
    console.log(data);
    // db.movies.insertMany(data)
    const result = await addMovie(data);
    response.send(result)
  });
  
  
  // Delete
  router.delete("/:id", async function (request, response) {
    const {id} = request.params;
    // db.movies.deleteOne({id: "101"})
    console.log (id)
    const result = await deleteMovieById(id);
    console.log(result);
    result.deletedCount>0
      ? response.send({ msg: "Movie was deleted successfully" }) 
      : response.status(404).send({ msg: "Movie not found" });
  });
  
  
  //  Update
  router.put("/:id", async function (request, response) {
    const {id} = request.params;
    const data = request.body;
    // db.movies.updateOne({id: "103"}, {$set: data})  // data like - {rating: 9}
    console.log (id)
    // const movie = movies.find((mv) => mv.id == id)
    const result = await editMovieById(id, data);
    console.log(result);
    result 
      ? response.send( result ) 
      : response.status(404).send({ msg: "No data found" });
  });

export default router;


