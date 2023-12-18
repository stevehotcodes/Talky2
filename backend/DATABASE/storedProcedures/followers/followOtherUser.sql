CREATE OR ALTER  PROCEDURE followOtherUser
(    @followerID VARCHAR(200),
   @followingID VARCHAR(200)

)
AS
BEGIN

    INSERT INTO followers (followerID, followingID)
     VALUES (@followerID, @followingID);

END


SELECT * from followers

