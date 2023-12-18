CREATE OR ALTER PROCEDURE addReplyToComment
(   @id VARCHAR (200),
    @userID VARCHAR (200),
    @commentContent VARCHAR (200),
    @postID VARCHAR (200),
    @parentCommentID VARCHAR (200)
)

AS
BEGIN
    INSERT INTO comments (id,userID, commentContent, postID, parentCommentID)
    VALUES (@id,@userID,@commentContent,@postID,@parentCommentID)
END