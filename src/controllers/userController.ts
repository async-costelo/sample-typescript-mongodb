import { Request, Response } from "express";
import User from "../user";
const exjwt = require('express-jwt')
const jwt = require('jsonwebtoken');

export let allUsers = (req: Request, res: Response) => {
    let user = User.find((err: any, user: any) => {
        if (err) {
            res.send("Error!");
        } else {
            res.send(user);
        }
    });
};

export let getUser = (req: Request, res: Response) => {
    let user = User.findById(req.params.id, (err: any, user: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(user);
        }
    });
};

export let deleteUser = (req: Request, res: Response) => {
    let user = User.deleteOne({ _id: req.params.id }, (err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Sucessfully deleted user: " + req.params.id);
        }
    });
};

export let updateUser = (req: Request, res: Response) => {
    // console.log(req.body);
    let user = User.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err: any, user: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully updated user: " + req.params.id);
            }
        }
    );
};


export let suspendUser = (req: Request, res: Response) => {
    // console.log(req.body);
    let user = User.findByIdAndUpdate(
        req.params.id,
        { "suspendFlag": true },
        (err: any, user: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully suspended user: " + req.params.id);
            }
        }
    );
}


export let addUser = (req: Request, res: Response) => {
    var user = new User(req.body);
    user.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(user);
        }
    });
};

export let authUser = async (req: Request, res: Response) => {
    try {

        let user = await User.findOne({ "username": req.body.username, "password": req.body.password }).exec();

        if (user) {

            let token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.TOKEN || 'sHr3k4l1f3',
                { expiresIn: 129600 },

                (err: any, token: any) => {
                    res.json({
                        sucess: true,
                        err: null,
                        token,
                    });
                }
            ); // Sigining the token

        } else {

            res.status(401).json({
                sucess: false,
                token: null,
                err: 'Username or password is incorrect',
            });
        }
    }
    catch (e) {
        console.log(e)
    }


}