
CREATE OR ALTER PROCEDURE signUpuser(
    @id VARCHAR(100),
    @fullName VARCHAR(200),
    @userName VARCHAR(200),
    @email VARCHAR(200),
    @password VARCHAR(200)
)
AS
BEGIN
    INSERT INTO users(id, fullName,userName, email, password)
    VALUES(@id, @fullName, @userName, @email, @password)
END




