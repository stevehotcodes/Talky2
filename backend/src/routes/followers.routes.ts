import { Router } from "express";
import { followOtherUser, getFollowers, unFollowOtherUser } from "../controllers/follower.controller";
import { accountRequired } from "../middlewares/verifyToken";




const followerRouter=Router()

followerRouter.post('/:followingID',accountRequired,followOtherUser);
followerRouter.get('',accountRequired,getFollowers)
followerRouter.delete('/:followingID',accountRequired,unFollowOtherUser)



export default followerRouter