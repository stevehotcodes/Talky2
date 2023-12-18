CREATE OR ALTER  PROCEDURE deletePost(
    @id VARCHAR (200)

)
AS 
BEGIN
    BEGIN 
   IF EXISTS (SELECT 1 FROM posts WHERE isDeleted = 0 AND  id = @id)
    UPDATE posts
    SET isDeleted =1
    WHERE isDeleted=0  AND id=@id;
    END
END






select * from posts
