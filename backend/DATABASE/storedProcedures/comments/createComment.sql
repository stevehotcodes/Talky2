CREATE OR ALTER PROCEDURE createComment
    @id VARCHAR(200),
    @userID VARCHAR(200),
    @commentContent VARCHAR(200),
    @postID VARCHAR(200)
AS 
BEGIN
    INSERT INTO comments (id, userID, commentContent, postID)
    VALUES (@id, @userID, @commentContent, @postID);
END;

