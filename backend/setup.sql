-- Create tables for the database schema

-- Table for Room
CREATE TABLE Room (
    pk SERIAL PRIMARY KEY,
    driveStuff VARCHAR(255), -- Replace with appropriate data type if needed
    users INT[] REFERENCES User(pk),
    categories INT[] REFERENCES Category(pk)
);

-- Table for User
CREATE TABLE User (
    pk SERIAL PRIMARY KEY,
    nickname VARCHAR(100) UNIQUE NOT NULL,
    google VARCHAR(255), -- Replace with appropriate data type if needed
    permissions INT[] REFERENCES Permission(pk),
    myRooms INT[] REFERENCES Room(pk)
);

-- Table for Category
CREATE TABLE Category (
    pk SERIAL PRIMARY KEY,
    categoryName VARCHAR(100) NOT NULL,
    channels INT[] REFERENCES Channel(pk)
);

-- Table for Channel
CREATE TABLE Channel (
    pk SERIAL PRIMARY KEY,
    channelName VARCHAR(100) NOT NULL,
    messages TEXT[], -- Replace with appropriate data type for Message if needed
    canEdit INT[] REFERENCES Permission(pk),
    canRead INT[] REFERENCES Permission(pk)
);

-- Table for Permission
CREATE TABLE Permission (
    pk SERIAL PRIMARY KEY,
    permissionName VARCHAR(100) NOT NULL
);