CREATE TABLE followers (
    followerID VARCHAR(200),
    followingID VARCHAR(200),
    PRIMARY KEY (followerID, followingID),
    FOREIGN KEY (followerID) REFERENCES users(id),
    FOREIGN KEY (followingID) REFERENCES users(id)
);
