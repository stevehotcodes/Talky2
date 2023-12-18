
export interface IPostLike{
    id:string
    userID:string
    timeStamp:string
    isDeleted:number
    postID:string
}

export interface IPostLikeCount{
    postLikes:number
}