import { v4 } from 'uuid'
import { Request, Response } from 'express'
import { ExtendedUser } from "../middlewares/verifyToken"
// import { IUserDetails, User } from "../interfaces/user.interfaces";
import DatabaseHelper from "../helpers/dbConnection.helper";
import { ICommentWithUserAndPostInfo, ICommentWithuserDetails } from '../interfaces/comments.interface';
import { IPosts } from '../interfaces/posts.interface';

const dbInstance = DatabaseHelper.getInstance()


export const createComment = async (req: ExtendedUser, res: Response) => {
    try {
        const id = v4();
        const userID = req!.info?.id as string
        const { postID } = req.params

        const { commentContent } = req.body
        console.log("Request Payload",commentContent)

        if(!commentContent){
            return res.status(400).json({message:"comment cannot be empty"})
        }
        //check whether the post exist or deleted
        let post:IPosts=(await dbInstance.exec('getOnePost',{id:postID})).recordset[0]
        console.log(post)

        if(!post){
            return res.status(404).json({message:"the post does not exist ,so cannot add comment "})
        }

        let result = await dbInstance.exec('createComment', { id, userID, commentContent, postID })
        console.log(result)
        return res.status(201).json({ message: "comment added" , commentID:id})

    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }


}


export const addReplyToComment = async (req: ExtendedUser, res: Response) => {
    try {
        const id = v4()

        const userID = req!.info?.id as string
        const { parentCommentID } = req.params
        const { commentContent, postID } = req.body

        let result = await dbInstance.exec('addReplyToComment', { id, userID, commentContent, postID, parentCommentID })
        console.log(result)
        return res.status(201).json({ message: "reply added" })

    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }


}


export const getAllComments = async (req: Request, res: Response) => {
    try {
        const { postID } = req.params
        //check whether post exists if not returnpost not found 
        let post:IPosts=(await dbInstance.exec('getOnePost',{id:postID})).recordset[0]
        console.log(post)

        if(!post){
            return res.status(404).json({message:"the post does not exist ,cannot get the comments"})
        }
        
        let comments:ICommentWithUserAndPostInfo[] = (await dbInstance.exec('getAllComments', { postID })).recordset;
        if (!comments) { return res.status(404).json({ message: "no comments" }) };

        return res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json({ error: error })

    }
}

export const getACommentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        let comments :ICommentWithuserDetails[]= (await dbInstance.exec('getCommentById', { id })).recordset
        if (!comments) { return res.status(404).json({ message: "no comments" }) };

        return res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json({ error: error })

    }
}



export const deleteComment = async (req: ExtendedUser, res: Response) => {
    try {
        let userID = req!.info?.id as string
        let { id } = req.params
        let comment = await dbInstance.exec('getCommentById', { id })
        console.log(comment)
        if (!comment) { return res.status(404).json({ message: "comment not found" }) }

        // there must be an if condition to check if the user is the one
        let result = await dbInstance.exec("deleteComment", { id, userID })
        console.log(result)
        return res.status(200).json({ message: "comment deleted",comment })

        //    let result =await dbInstance.exec("deleteComment",{id,userID})

    } catch (error) {
        return res.status(500).json({ error: error })
    }
}