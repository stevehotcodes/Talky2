import { v4 } from 'uuid'
import { Request, Response } from 'express'
import { ExtendedUser } from "../middlewares/verifyToken"
// import { IUserDetails, User } from "../interfaces/user.interfaces";
import DatabaseHelper from "../helpers/dbConnection.helper";
import {  IPosts, IPostsWithUserDetails } from '../interfaces/posts.interface';
import { ICommentWithUserAndPostInfo } from '../interfaces/comments.interface';

const dbInstance = DatabaseHelper.getInstance()






export const createNewPost = async (req: ExtendedUser, res: Response) => {
    try {
        let id = v4()
        let userID = req!.info?.id as string
        const { postImageUrl , postContent } = req.body
        console.log(postImageUrl)

        if (!postImageUrl) {
            return res.status(400).json({ error: "'postImageUrl' is required." });
          }

        let result = await dbInstance.exec("createNewPost", {
            id,
            postImageUrl,
            postContent,
            userID

        });

        console.log(result);
        return res.status(201).json( {message:"Post created succesfully",postId:id})


    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ error: error.message })

    }

}


export const getAllPost = async (req: ExtendedUser, res: Response) => {
    try {

        const posts:IPostsWithUserDetails[] = await (await dbInstance.exec('getAllPosts')).recordset
        if (!posts.length) {
            return res.status(404).json({ message: "No posts found" });
        }

        console.log(posts);
        return res.status(200).json(posts)


    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ error: error.message })

    }

}

export const getPostsByUser = async (req: ExtendedUser, res: Response) => {
    try {

        let userID=req.info?.id as string
        const posts: IPostsWithUserDetails[] = await (await dbInstance.exec('getPostsByUser',{userID})).recordset
        if (!posts.length) {
            return res.status(404).json({ message: "No posts found" });
        }

        console.log(posts);
        return res.status(200).json(posts)


    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ error: error.message })

    }

}




export const deletePost = async (req: ExtendedUser, res: Response) => {
    try 
    {
        const { id } = req.params
        const userID = req!.info?.id as string
        //check whether the question has been deleted
        let post:IPosts=(await dbInstance.exec('getOnePost',{id})).recordset[0]
        console.log(post)

        if(!post){
            return res.status(404).json({message:"the post does not exist"})
        }
        
        await dbInstance.exec('deletePost', {id})
        return res.status(200).json('post deleted successful')
    }

    catch (error: any) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}



export const getOnePost =async(req:Request , res:Response)=>{
    try{
        let {id}=req.params
        let post:IPostsWithUserDetails[] =(await dbInstance.exec('getOnePost',{id})).recordset
        let comments:ICommentWithUserAndPostInfo[] = (await dbInstance.exec('getAllComments', { postID:id })).recordset;
        post?console.log("here is the post your are trying to fetch",post):console.log("no post found")
        if(!post){
            return res.status(404).json({message:"post was not found"})
           
        }
        return res.status(200).json({post,comments})

    }
    catch(error:any){
        return res.status(500).json({error:error.message})

    }
}