CREATE OR ALTER PROCEDURE deleteComment(
    @id VARCHAR(200),
    @userID VARCHAR (200)
)
AS
BEGIN
    UPDATE comments
    SET isDeleted=1
    WHERE isDeleted=0 AND id=@id AND userID=@userID
END