CREATE TABLE postLikesTable(
    id VARCHAR (200) PRIMARY KEY,
    userID VARCHAR (200) FOREIGN KEY REFERENCES users(id),
    postID VARCHAR(200) FOREIGN KEY REFERENCES posts(id),
    timeStamp DATE  DEFAULT GETDATE() ,
    isDeleted INT DEFAULT 0
    
)
    
SELECT * from postLikesTable