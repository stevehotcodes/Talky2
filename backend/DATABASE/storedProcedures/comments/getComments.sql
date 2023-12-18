CREATE OR ALTER PROCEDURE getAllcomments(
@postID VARCHAR(200))
AS
BEGIN
	SELECT c.id , c.commentContent as commentContent,c.userID as commenterID,c.isDeleted,c.postID as postID,c.commentTimeStamp as commentedAt,c.parentCommentID,p.postImageUrl as postImage,p.postTImeStamp as postedAt, p.postContent as postCaption,
	u.fullName as commenterFullName,u.userName as commentedBy
	 FROM comments as c
	 LEFT JOIN users as u  
	 ON c.userID=u.id
	 LEFT JOIN posts as p 
	 ON c.postID=p.id
	WHERE c.postID=@postID AND c.isDeleted=0
END
















--   {
--     "id": "a66fae15-45da-48f0-a397-2326abc10a43",
--     "commentContent": "csscscscscscsc",
--     "userID": "5afc87d4-c0a5-475c-862f-9432277b71fb",
--     "isDeleted": 0,
--     "postID": "35400e29-3cf6-4494-8423-5287c27b820f",
--     "commentTimeStamp": "2023-12-16T00:00:00.000Z",
--     "parentCommentID": null
--   },