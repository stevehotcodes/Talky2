CREATE OR ALTER PROCEDURE addLikeToComment
(
    @id VARCHAR (200),
    @commentID VARCHAR (200),
    @userID VARCHAR (200)
)

AS
BEGIN
    INSERT INTO commentLikesTable(id,commentID,userID)
    VALUES(@id,@commentID,@userID)
END