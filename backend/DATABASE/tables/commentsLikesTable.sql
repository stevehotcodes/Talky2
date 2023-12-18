CREATE TABLE commentLikesTable(
    id VARCHAR (200) PRIMARY KEY,
    userID VARCHAR (200) FOREIGN KEY REFERENCES users(id),
    commentID VARCHAR(200) FOREIGN KEY REFERENCES comments(id),
    timeStamp DATE  DEFAULT GETDATE() 
    
)
    
