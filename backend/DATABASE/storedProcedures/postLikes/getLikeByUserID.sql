CREATE OR ALTER PROCEDURE getLikeByUserID(
    @userID VARCHAR (200),
    @postID VARCHAR(200)
)
AS
BEGIN
    SELECT * FROM postLikesTable 
    WHERE userID=@userID AND postID=@postID
END