// STEP-1 - Import Express
// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import moviesRouter from "./routes/movies.route.js"
import usersRouter from "./routes/users.route.js"
// const express = require("express");
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
import cors from 'cors';


dotenv.config()

// console.log(process.env);  // evn -> environment variables


// STEP-2
const app = express();


// STEP-5 : Establish a connection b/w mongodb & nodeJS - after installing mongodb
// const MONGO_URL = "mongodb://127.0.0.1";  // by default
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL); // phone dial
// top-level await (we can use await outside function) - works only in type=module
await client.connect();  // call button
console.log("Mongo is connected") // to check whether the server is connected or not


// STEP-6
// express.json() - middleware (inbuilt) | converts data to Json
app.use(express.json());
// 3rd party CORS Middleware
app.use(cors()); 


const PORT = process.env.PORT;
// STEP-3
// const PORT = 4000;
app.get("/", function (request, response) {
  response.send("Cool Weather");
});

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);

// STEP-4
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export {client}