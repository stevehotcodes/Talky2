import { Router } from "express";
import { forgotPassword, getAUserById, getAllUsers, getSignedInUser, loginUser, resetPassword, signUp, updateUser } from "../controllers/users.controllers";
import { accountRequired } from "../middlewares/verifyToken";




const userRouter = Router()

userRouter.post('/signup',signUp)
userRouter.post('/login',loginUser)
userRouter.get('/:id',getAUserById)
userRouter.post("/logged",accountRequired,getSignedInUser);
userRouter.post('/all',accountRequired,getAllUsers)
userRouter.patch('/update',accountRequired,updateUser)
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password',resetPassword)






export default userRouter