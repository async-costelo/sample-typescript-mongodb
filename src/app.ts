import express, { Request, Response, request, response, json } from "express";
import * as userController from "./controllers/userController";
// import bodyParser from "body-parser"; not necessary

const app = express();
app.use(express.json());
app.set("port", process.env.PORT || 3000);


var obj = {
    message: 'test typescript-mongodb'
};

app.get("/", (req: Request, res: Response) => res.send(obj));

app.get("/users", userController.allUsers);
app.get("/user/:id", userController.getUser);
app.post("/user", userController.addUser);
app.put("/user/:id", userController.updateUser);
app.delete("/user/:id", userController.deleteUser);

app.put("/suspend/:id", userController.suspendUser);


const server = app.listen(app.get("port"), () => {
    console.log("app is running on http://localhost:%d", app.get("port"));
})