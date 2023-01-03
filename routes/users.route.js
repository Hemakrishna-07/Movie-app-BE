import express from "express";
import { createUser, getUserByName } from "../services/users.service.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";

const router = express.Router();


async function genHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);  //Random string
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashedPassword);
  return hashedPassword;
}

// genHashedPassword("password@123")  //return hashedPassword inside object

  
// Create
router.post("/signup", async function (request, response) {

  // const data = request.body;  // array destructuring
  const { username, password } = request.body;
  // console.log(data);

  const userFromDB = await getUserByName(username);
  console.log(userFromDB)

  if (userFromDB) {
    response.status(400).send({message: "Username already exists"});
  }else if (password.length < 8) {
    response.status(400).send({message: "Password must be atleast 8 characters"})
  }else {
    const hashedPassword = await genHashedPassword(password);
    console.log(password, hashedPassword);

    // db.users.insertOne(data)
    // const result = await createUser(data);  // array destructured values
    const result = await createUser({
      username : username,
      password : hashedPassword
    });

    response.send(result)
    }
});


router.post("/login", async function (request, response) {

    // const data = request.body;  // array destructuring
    const { username, password } = request.body;
    // console.log(data);
  
    const userFromDB = await getUserByName(username);
    console.log(userFromDB)
  
    if (!userFromDB) {
      response.status(400).send({message: "Invalid credentials"});
    } else {
      const storedDBPassword = userFromDB.password;
      const isPasswordMatch = await bcrypt.compare(password, storedDBPassword)
      console.log(isPasswordMatch)
      if (isPasswordMatch) {
        // JWT generation
        const token = jwt.sign({id: userFromDB._id}, process.env.SECRET_KEY);
        
        response.send({message: "Successful login", token: token})
      } else{
        response.status(401).send({message: "Invalid credentials"});
      }
    }
 
});


export default router;

