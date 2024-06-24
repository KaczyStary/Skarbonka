USE PiggyBank;
GO

CREATE TABLE RoomUser(
	Id INTEGER IDENTITY(1,1) PRIMARY KEY,
	FirstName VARCHAR(255) NOT NULL,
	Surname VARCHAR(255) NOT NULL,
);

CREATE TABLE Users(
	Id INTEGER IDENTITY(1,1) PRIMARY KEY,
	Username VARCHAR(255) NOT NULL,
	Password VARCHAR(255) NOT NULL,
	RoomUserId INTEGER
	FOREIGN KEY(RoomUserId) REFERENCES RoomUser(Id)
);

CREATE TABLE Card(
	Id INTEGER IDENTITY(1,1) PRIMARY KEY,
	SerialNumber VARCHAR(19) NOT NULL,
	ExpireDate DATE NOT NULL,
	CVC TINYINT,
	UserId INTEGER,
	FOREIGN KEY(UserId) REFERENCES Users(Id)
);

CREATE TABLE Room(
	Id INTEGER IDENTITY(1,1) PRIMARY KEY,
	Name VARCHAR(255) NOT NULL,
	Password VARCHAR(255),
);

CREATE TABLE Room_RoomUser(
	RoomId INTEGER,
	RoomUserId INTEGER,
	PRIMARY KEY(RoomId, RoomUserId),
	FOREIGN KEY(RoomId) REFERENCES Room(Id),
	FOREIGN KEY(RoomUserId) REFERENCES RoomUser(Id)
);

CREATE TABLE Expense(
	Id INTEGER IDENTITY(1,1) PRIMARY KEY,
	Name VARCHAR(255) NOT NULL,
	PurchaseDate DATE NOT NULL,
	RoomId INTEGER,
	FOREIGN KEY(RoomId) REFERENCES Room(Id)
);

CREATE TABLE Item(
	Id INTEGER IDENTITY(1,1) PRIMARY KEY,
	Name VARCHAR(255) NOT NULL,
	Price FLOAT NOT NULL,
	ExpenseId INTEGER,
	FOREIGN KEY(ExpenseId) REFERENCES Expense(Id)
);