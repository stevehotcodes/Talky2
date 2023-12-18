export interface InewUserDetails{
    fullName:string
    userName:string
    email:string
    password:string
}

export interface IUserLogincredntials{
    email:string
    password:string
}
export interface IloggedUser{
    email:string
    token:string
    id:string
}
export interface IflashMessage {
    type: 'error' | 'success' | 'info'
    message:string
  }

  
export interface InewPostDetails{
    postContent:string
    postImageUrl:string
 }

 export interface InewPostSuccessMessage{
    message:string
    postId:string
 }
 export interface IPosts{
    id:string
    postContent:string
    postImageUrl:string
    postTImeStamp:string
    userID:string
 }
 export interface IPostWithCommentsAndUserDetails{
    postID:string
    postImageUrl:string
    postContent:string
    postTImeStamp:string
    posterID:string
    posterFullName:string
    posterUserName:string
    posterProfilePic:string
    commentID:string
    commentContent:string
    commenterID:string
    commentedAt:string
    commenterFullName:string


}

export interface IPostsWithUserDetails{
    postID:string
    postImageUrl:string
    postContent:string
    postTImeStamp:string
    userID:string
    fullName:string
    userName:string
    profileImagUrl:string
    likesCount:number
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
export interface IPostLikeCount{
    postLikes:number
}
export interface IUserDetails{
    id: string;
    fullName: string;
    userName:string;
    email: string;
    password: string;
    role: string;
    profileImageUrl:string
    isWelcomed: 0 |1,
    isResetPasswordEmailSent: 0,
    resetPasswordToken: string
    isDeleted: 0 | 1
    dateJoined:string
    bio:string
    
  }
  
  export interface IPostsWithUserDetails{
    postID:string
    postImageUrl:string
    postContent:string
    postTImeStamp:string
    userID:string
    fullName:string
    userName:string
    profileImagUrl:string
    likesCount:number
}

export interface IgetFollowers{
    followerID:string
    followingID:string
}

export interface IEditUserDetails{
    userName:string
    email:string
    bio:string
    password:string
    profileImageUrl:string

}

export interface IresetPasswordUserData{
    resetToken:string
    newPassword:string
  }

