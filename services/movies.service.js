import { client } from "../index.js";

export async function editMovieById(id, data) {
    return await client
        .db("b39wd")
        .collection("movies")
        .updateOne({ id: id }, { $set: data });
}
export async function deleteMovieById(id) {
    return await client
        .db("b39wd")
        .collection("movies")
        .deleteOne({ id: id });
}
export async function addMovie(data) {
    return await client
        .db("b39wd")
        .collection("movies")
        .insertMany(data);
}
export async function getMovieById(id) {
    return await client
        .db("b39wd")
        .collection("movies")
        .findOne({ id: id });
}
export async function getAllMovies(request) {
    return await client
        .db("b39wd")
        .collection("movies")
        // .find({})
        .find(request.query)
        .toArray();
}
