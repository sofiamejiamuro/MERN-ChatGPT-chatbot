import { Router } from "express";
import { getAllUsers, usersLogin, usersSignup } from "../controllers/user-controllers.js";
import { loginValidator, singupValidator, validate  } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(singupValidator), usersSignup);
userRoutes.post("/login", validate(loginValidator), usersLogin);

export default userRoutes;