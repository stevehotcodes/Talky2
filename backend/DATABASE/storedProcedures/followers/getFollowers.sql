CREATE OR ALTER PROCEDURE getFollowers(
    @followerID VARCHAR(200)
    
    )
AS
BEGIN 
    SELECT * FROM followers
    WHERE followerID=@followerID
END