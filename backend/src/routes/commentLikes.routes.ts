import { Router } from "express";

import { accountRequired } from "../middlewares/verifyToken";
import { addLikeToComment, getLikesofAComment } from "../controllers/commentsLikes.controller";





const commentLikesRouter = Router()

commentLikesRouter.post('/:commentID', accountRequired,addLikeToComment)

commentLikesRouter.get('/:commentID',getLikesofAComment)




export default commentLikesRouter