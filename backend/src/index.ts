import cors from "cors";
import express, { Request,Response,json } from "express";
import { dbConnectService } from "./services/dbConnection.service";
import mssql from 'mssql'
import { dbConfig } from "./config/dbConfig";
import userRouter from "./routes/users.routes";
import postsRouter from "./routes/posts.routes";
import commentRouter from "./routes/comment.routes";
import postLikeRouter from "./routes/postLike.routes";
import commentLikesRouter from "./routes/commentLikes.routes";
import followerRouter from "./routes/followers.routes";


const port= 3400

const app =express()
app.use(cors())
app.use(json())



app.get('/',(req:Request,res:Response)=>{
     res.status(200).json({message:'Hello I am configured'});
})

app.use('/users',userRouter)
app.use('/posts',postsRouter)
app.use('/comments',commentRouter)
app.use('/postlike',postLikeRouter)
app.use('/commentLike',commentLikesRouter)
app.use('/followers',followerRouter)
// console.log( process.env.DB_USER as string ||'sa',)



app.listen(port,()=>{
    console.log("Express Server is running on port ", port)
})

export default app