import { Router } from "express";

import { accountRequired } from "../middlewares/verifyToken";
import { createNewPost, deletePost, getAllPost, getOnePost, getPostsByUser } from "../controllers/posts.controllers";
import userRouter from "./users.routes";




const postsRouter = Router()

postsRouter.post('/new' ,accountRequired,createNewPost)
postsRouter.get('/one/:id',getOnePost)
postsRouter.get('/all' ,getAllPost)
postsRouter.patch("/:id",accountRequired,deletePost)
postsRouter.get('/user',accountRequired,getPostsByUser)





export default postsRouter