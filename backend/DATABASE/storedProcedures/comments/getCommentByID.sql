CREATE OR ALTER PROCEDURE getCommentById
    (
    @id VARCHAR(200)
)
AS
BEGIN
    SELECT c.id , c.commentContent, c.userID, c.isDeleted, c.postID, c.commentTimeStamp, p.id as postId, p.postContent as postCaption ,p.postImageUrl as imagePost, u.id as userId , u.userName
    FROM comments as c
        LEFT JOIN users as u
        ON c.userID=u.id
        LEFT JOIN posts as p
        ON c.postID=p.id
    WHERE c.isDeleted=0 and c.id=@id
END