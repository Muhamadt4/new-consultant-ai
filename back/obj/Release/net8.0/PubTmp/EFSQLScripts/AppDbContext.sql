IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250320001635_AddUserDataTable'
)
BEGIN
    CREATE TABLE [Users] (
        [User_id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NOT NULL,
        [Email] nvarchar(max) NOT NULL,
        [Password_Hash] nvarchar(max) NOT NULL,
        [Created_At] datetime2 NOT NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([User_id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250320001635_AddUserDataTable'
)
BEGIN
    CREATE TABLE [UserData] (
        [UserDataId] int NOT NULL IDENTITY,
        [UserId] int NOT NULL,
        [BusinessType] nvarchar(max) NOT NULL,
        [Inputs] nvarchar(max) NOT NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_UserData] PRIMARY KEY ([UserDataId]),
        CONSTRAINT [FK_UserData_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([User_id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250320001635_AddUserDataTable'
)
BEGIN
    CREATE INDEX [IX_UserData_UserId] ON [UserData] ([UserId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250320001635_AddUserDataTable'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250320001635_AddUserDataTable', N'9.0.3');
END;

COMMIT;
GO

