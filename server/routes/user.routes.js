import { Router } from "express";
import { signupUser, loginUser } from "../controllers/user.controllers.js";
const userRouter = Router()

userRouter.post('/signup', signupUser)
userRouter.post('/login', loginUser)

export default userRouter