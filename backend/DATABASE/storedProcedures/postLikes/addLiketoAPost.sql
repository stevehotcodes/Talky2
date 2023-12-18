CREATE OR ALTER PROCEDURE addLikeToPost
(
    @id VARCHAR (200),
    @postID VARCHAR (200),
    @userID VARCHAR (200)
)

AS
BEGIN
    INSERT INTO postLikesTable(id,postID,userID)
    VALUES(@id,@postID,@userID)
END