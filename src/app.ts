require('dotenv').config()
import express, { Request, Response, request, response, json } from "express";
import * as userController from "./controllers/userController";
const exjwt = require('express-jwt');
const ejs = require('ejs');
const path = require('path');


const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.set("port", process.env.PORT || 3000);

const jwtMW = exjwt({
    secret: process.env.TOKEN || 'sHr3k4l1f3', //delete OR if u have .env file
    algorithms: ['HS256']
});


app.use((req: Request, res: Response, next) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();

});

app.get("/", jwtMW, (req: Request, res: Response) => res.render('pages/index'));
// ^ Authorization type: Bearer Token. Get token from /auth response

app.get("/users", userController.allUsers); //get all Users
app.get("/user/:id", userController.getUser); //get a User via id

app.post("/user", userController.addUser);
// ADD USER FIRST (wt username & password) THEN AUTHENTICATE VIA /auth route

app.put("/user/:id", userController.updateUser); //update a User

app.delete("/user/:id", userController.deleteUser); //delete a User

app.put("/suspend/:id", userController.suspendUser); //suspend? a User

app.post("/auth", userController.authUser); // sign user with JWT


const server = app.listen(app.get("port"), () => {
    console.log("app is running on http://localhost:%d", app.get("port"));
})