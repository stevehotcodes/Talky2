import {v4 }from 'uuid'
import { Request,Response } from 'express'
import { ExtendedUser } from "../middlewares/verifyToken"
// import { IUserDetails, User } from "../interfaces/user.interfaces";
import DatabaseHelper from "../helpers/dbConnection.helper";


const dbInstance=DatabaseHelper.getInstance()


export const addLikeToComment =async(req:ExtendedUser,res:Response)=>{
    try {   
            let id=v4()
            let userID=req.info?.id as string
            let {commentID}=req.params

            let result= await dbInstance.exec('addLikeToComment',{id,userID,commentID})

            return res.status(201).json({message:"comment was liked"});
            
        
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}

export const getLikesofAComment=async(req:ExtendedUser,res:Response)=>{
    try {   
            
         
            let {commentID}=req.params

            let likes= (await dbInstance.exec('getLikesofAComment',{commentID})).recordset

            return res.status(201).json({message:likes.length});
            
        
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}