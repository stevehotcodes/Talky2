CREATE OR ALTER PROCEDURE getAllPosts
AS
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
        COUNT(pl.id) AS likeCount
    FROM
        posts AS p
        LEFT JOIN users AS u ON p.userID = u.id
        LEFT JOIN postLikesTable AS pl ON p.id = pl.postID
    WHERE
        p.isDeleted = 0
    GROUP BY
        p.id,
        p.postImageUrl,
        p.postContent,
        p.postTImeStamp,
        p.userID,
        u.userName,
        u.fullName,
        u.profileImageUrl;
END
