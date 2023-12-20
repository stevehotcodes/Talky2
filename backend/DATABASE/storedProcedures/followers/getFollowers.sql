CREATE OR ALTER PROCEDURE getFollowers(
    @followerID VARCHAR(200)
    
    )
AS
BEGIN 
    SELECT users.fullName, users.userName, users.profileImageUrl, followers.*
     FROM followers
    LEFT JOIN users 
    ON followers.followingID=users.id
    WHERE followerID=@followerID
END