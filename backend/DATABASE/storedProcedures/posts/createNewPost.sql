CREATE OR ALTER PROCEDURE createNewPost(
    @id VARCHAR (200),
    @postImageUrl VARCHAR(8000) ,
    @postContent VARCHAR(200) ,
    @userID VARCHAR(200)
)
AS
BEGIN 
    INSERT INTO posts (id,postImageUrl,postContent,userID)
    VALUES(@id,@postImageUrl,@postContent,@userID)
END
