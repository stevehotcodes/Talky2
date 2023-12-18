import {v4 }from 'uuid'
import { Request,Response } from 'express'
import { ExtendedUser } from "../middlewares/verifyToken"
// import { IUserDetails, User } from "../interfaces/user.interfaces";
import DatabaseHelper from "../helpers/dbConnection.helper";
import { IPosts } from '../interfaces/posts.interface';
import { IPostLike, IPostLikeCount } from '../interfaces/postLikes.interface';


const dbInstance=DatabaseHelper.getInstance()


export const addLikeToPost = async (req: ExtendedUser, res: Response) => {
    try {
      let id = v4();
      let userID = req.info?.id as string;
      let { postID } = req.params;
  
      // Check whether the post exists; if not, prevent like
      let post: IPosts = (await dbInstance.exec('getOnePost', { id: postID })).recordset[0];
  
      if (!post) {
        return res.status(404).json({ message: "The post does not exist" });
      }
  
      // Check whether the user has already liked the post
      let likeByUser: IPostLike = (await dbInstance.exec('getLikeByUserID', { userID, postID })).recordset[0];
  
      if (!likeByUser) {
        // If the user has not liked the post, add the like
        await dbInstance.exec('addLikeToPost', { id, userID, postID });
        return res.status(201).json({ message: "Post was liked" });
      } else {
        // If the user has already liked the post, return an error
        return res.status(400).json({ message: "You already liked the post" });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
  

export const getLikesofAPost=async(req:ExtendedUser,res:Response)=>{
    try {   
            
         
            let {postID}=req.params
            //check whether the post is deleted
            let post:IPosts=(await dbInstance.exec('getOnePost',{id:postID})).recordset[0]
            console.log(post)
    
            if(!post){
                return res.status(404).json({message:"the post does not exist,so cannot get the likes"})
            }

            let likes:IPostLikeCount[]= (await dbInstance.exec('getLikesofAPost',{postID})).recordset

            return res.status(201).json(likes);
            
        
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}