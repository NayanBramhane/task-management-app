import express from "express";
import {
   register, login, getMyProfile, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

// below three lines are converted to this line
// router.route("/userid/:id").get(getUserById).put(updateUser).delete(deleteUser);

// router.get("/userid/:id", getUserById);
// router.put("/userid/:id", updateUser);
// router.delete("/userid/:id", deleteUser);

export default router;
