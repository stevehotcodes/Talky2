


export interface  IComment{
    id:string
    commentContent:string
    userID:string
    isDeleted:0 |1
    postID:string
    commentTImeStamp:string
    parentCommentID:string
}

export interface ICommentWithuserDetails{
     id:string
    commentContent:string
    userID:string
    isDeleted:0|1
    postID:string
    commentTimeStamp:string
    postId:string
    userId:string
    userName:string
    postCaption:string
    imagePost:string

}


export interface ICommentWithUserAndPostInfo{
    id:string
    commentContent:string
    commenterID:string
    isDeleted:number
    postID:string
    commentedAt:string
    parentCommentID:string
    postImage:string
    postedAt:string
    postCaption:string
    commenterFullName:string
    commentedBy:string
    
}