CREATE OR ALTER PROCEDURE getOnePost(
    @id VARCHAR(200)
)
AS
BEGIN
    SELECT * FROM posts WHERE id=@id 
    AND isDeleted=0;
END