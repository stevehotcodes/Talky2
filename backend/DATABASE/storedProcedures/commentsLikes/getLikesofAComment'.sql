CREATE OR ALTER PROCEDURE getLikesofAComment(
    @commentID VARCHAR (200)
)
AS
BEGIN
    SELECT * FROM commentLikesTable
    WHERE commentID=@commentID
END