CREATE OR ALTER PROCEDURE getPostsByUser(
    @userID VARCHAR (200)
)
AS
BEGIN
    SELECT p.id as postID,p.postImageUrl,p.postContent,p.postTImeStamp, u.id as userId ,u.fullName,u.userName,u.profileImageUrl
    FROM posts as p
    LEFT JOIN users as u
    ON  p.userID =u.id
    WHERE userID=@userID and p.isDeleted=0
END