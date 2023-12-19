CREATE OR ALTER PROCEDURE getOnePost(
    @id VARCHAR(200)
)

AS
BEGIN
BEGIN
    SELECT
        p.id AS postID,
        p.postImageUrl,
        p.postContent,
        p.postTImeStamp,
        p.userID,
        u.userName,
        u.fullName,
        u.profileImageUrl,
        COUNT(pl.id) AS likeCount,
        COUNT(c.postID) AS commentCount

    FROM
        posts AS p
        LEFT JOIN users AS u ON p.userID = u.id
        LEFT JOIN postLikesTable AS pl ON p.id = pl.postID
        LEFT JOIN comments AS c ON p.id=c.postID
    WHERE
        p.isDeleted = 0 AND p.id=@id
    
    GROUP BY
        p.id,
        p.postImageUrl,
        p.postContent,
        p.postTImeStamp,
        p.userID,
        u.userName,
        u.fullName,
        u.profileImageUrl,
    END

    
END