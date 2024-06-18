import { NextFunction, Response, Request } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction ) => {
    try {
        // get all users
        const users = await User.find();
        return res.status(200).json({message: "OK", users})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "ERROR getAllusers", cause:error.message});
    }
};

export const usersSignup = async (
    req: Request,
    res: Response,
    next: NextFunction ) => {
    try {
        // user signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send("This email is already registered");
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password:hashedPassword });
        await user.save(); 

        // clean cookie
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });

        // create token    
        const token = createToken(user._id.toString(), user.email, "7d");
        
        // send token in form of cookies, send cookie form the backend to the frontend (cookie-parser)
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({ message: "OK", id:user._id.toString() })
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR usersSignup", cause:error.message});
    }
};


export const usersLogin = async (
    req: Request,
    res: Response,
    next: NextFunction ) => {
    try {
        // user login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect){
            return res.status(403).send("Incorrect Password");
        }

        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });

        // create token    
        const token = createToken(user._id.toString(), user.email, "7d");
        
        // send token in form of cookies, send cookie form the backend to the frontend (cookie-parser)
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(201).json({ message: "OK", id:user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR usersSignup", cause:error.message});
    };
};