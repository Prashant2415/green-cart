const express = require("express");
const { signIn, signUp, logout, verifyUser } = require("../controller/authController");
const authRouter = express.Router();

//API calls
authRouter.post("/signUp", signUp);
authRouter.post("/signIn", signIn);
authRouter.post("/logout", logout);
authRouter.get("/verifyUser", verifyUser);

module.exports = authRouter;