CREATE OR ALTER PROCEDURE getLikesofAPost(
    @postID VARCHAR (200)
)
AS
BEGIN
   SELECT COUNT(*) AS postLikes FROM postLikesTable
    WHERE postID=@postID
END