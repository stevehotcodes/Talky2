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
        COUNT(pl.id) AS likeCount,
        COUNT(c.postID) AS commentsCount
         

    FROM
        posts AS p
        LEFT JOIN users AS u ON p.userID = u.id
        LEFT JOIN postLikesTable AS pl ON p.id = pl.postID
        LEFT JOIN comments AS c ON p.id=c.postID
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

-- CREATE OR ALTER PROCEDURE GetAllPostsAndComment
-- AS
-- BEGIN
--     SELECT
--         posts.id,
--        posts.postContent,
        
--             (SELECT
                
--                 comments.id as commentID,
--                  comments.commentContent as commentContent,
--                  comments.commentTimeStamp as commentedAt,
--                  comments.postID
--                 FROM comments 
--                 WHERE posts.id=comments.postID
--                 FOR JSON AUTO
            
--         ) AS comments
--     FROM
--         posts
   
--     ORDER BY
--         posts.id DESC;
-- END 



