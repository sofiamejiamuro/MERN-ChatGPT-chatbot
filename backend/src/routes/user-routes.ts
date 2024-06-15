import { Router } from "express";
import { getAllUsers, usersSignup } from "../controllers/user-controllers.js";
import { singupValidator, validate  } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(singupValidator), usersSignup);

export default userRoutes;