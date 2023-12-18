import { Router } from "express";
import { addLikeToPost, getLikesofAPost } from "../controllers/postLikes.controller";
import { accountRequired } from "../middlewares/verifyToken";



const postLikeRouter=Router()

postLikeRouter.post('/:postID',accountRequired,addLikeToPost);
postLikeRouter.get('/:postID',accountRequired,getLikesofAPost)




export default postLikeRouter