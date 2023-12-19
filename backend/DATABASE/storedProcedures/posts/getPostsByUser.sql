CREATE OR ALTER PROCEDURE getPostsByUser(
    @userID VARCHAR (200)
)
AS
BEGIN
    SELECT p.id as postID,p.postImageUrl,p.postContent,p.postTImeStamp, u.id as userId ,u.fullName,u.userName,u.profileImageUrl, COUNT(pl.id) AS likeCount,
        COUNT(c.postID) AS commentCount
    FROM posts as p
    LEFT JOIN users as u
    ON  p.userID =u.id
    LEFT JOIN postLikesTable AS pl ON p.id = pl.postID
    LEFT JOIN comments AS c ON p.id=c.postID
    WHERE p.userID=@userID and p.isDeleted=0
     GROUP BY
        p.id,
        p.postImageUrl,
        p.postContent,
        p.postTImeStamp,
        p.userID,
        u.userName,
        u.fullName,
        u.profileImageUrl,
        u.id;
END