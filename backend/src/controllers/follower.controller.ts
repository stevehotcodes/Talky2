import { v4 } from "uuid";
import { ExtendedUser } from "../middlewares/verifyToken";
import { Request,Response } from "express";
import DatabaseHelper from "../helpers/dbConnection.helper";


// const dbInstance=DatabaseHelper.getInstance()


export const followOtherUser=async(req:ExtendedUser,res:Response)=>{
    try {

        let followerID=req!.info?.id as string
        let {followingID}=req.params

        let result=await DatabaseHelper.exec('followOtherUser',{followerID,followingID});
        console.log(result)

        return res.status(201).json({message:"you are folllowing that user"})        
    } catch (error:any) {
        return res.status(500).json({error:error.message})
        
    }
}

export const getFollowers=async(req:ExtendedUser,res:Response)=>{
    try {

        let followerID=req!.info?.id as string
       

        let followers=(await DatabaseHelper.exec('getFollowers',{followerID})).recordset;
        console.log(followers)

        return res.status(201).json(followers)        
    } catch (error:any) {
        return res.status(500).json({error:error.message})
        
    }
}

export const unFollowOtherUser=async(req:ExtendedUser,res:Response)=>{
    try {

        let followerID=req!.info?.id as string
        let {followingID}=req.params

        let result=await DatabaseHelper.exec('unFollowOtherUser',{followerID,followingID});
        console.log(result)

        return res.status(201).json({message:"unfollowed"})        
    } catch (error:any) {
        return res.status(500).json({error:error.message})
        
    }
}

