CREATE OR ALTER PROCEDURE unFollowOtherUser(
     @followerID VARCHAR(200),
   @followingID VARCHAR(200)
)
AS
BEGIN 
    DELETE FROM followers
    WHERE followerID=@followerID AND followingID=@followingID
END