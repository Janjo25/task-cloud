-- Accounts
/*
* The password for each user is their first name in lowercase.
*/
INSERT INTO account (email, password, profile_image_url, username)
VALUES
    (
        'alice.smith@example.com',
        '$2b$12$ivgimkQSUH7ipnCkKQjBye2Oy9zXUas.NcZl5CjdA2YcghvD0IXXq',
        'http://localhost:3000/storage/profile-avatars/paranoid.jpeg',
        'alice_s'
    ),
    (
        'david.johnson@example.com',
        '$2b$12$moCIz7hEoAerhcu1rtpr/OQ9DZ9rpVMDjlnmTwgU7BNjqlbdCZOCi',
        'http://localhost:3000/storage/profile-avatars/secret-treaties.png',
        'david_j'
    ),
    (
        'emma.wilson@example.com',
        '$2b$12$Ca5ghddQ/E3tUcbNKttT0uNYkDpc2a2nbEhJO9kZQULIXuaPdoiY.',
        NULL,
        'emma_w'
    );

-- Files
INSERT INTO file (account_id, file_name, file_type, file_url)
VALUES
    (
        1,
        'brother-where-you-bound.gif',
        'image/gif',
        'http://localhost:3000/storage/user-files/brother-where-you-bound.gif'
    ), -- Alice's file.
    (
        1,
        'lorem-ipsum.txt',
        'text/plain',
        'http://localhost:3000/storage/user-files/lorem-ipsum.txt'
    ), -- Alice's file.
    (
        2,
        'paranoid.jpeg',
        'image/jpeg',
        'http://localhost:3000/storage/user-files/paranoid.jpeg'
    ), -- David's file.
    (
        3,
        'secret-treaties.png',
        'image/png',
        'http://localhost:3000/storage/user-files/secret-treaties.png'
    ); -- Emma's file.

-- Tasks
INSERT INTO task (account_id, completed, description, title)
VALUES
    (
        1,
        false,
        'Initial database setup with Docker and PostgreSQL.',
        'Database Initialization'
    ), -- Alice's task.
    (
        1,
        true,
        'Implement password hashing with bcrypt.',
        'Authentication Setup'
    ), -- Alice's task.
    (
        2,
        false,
        'Design and validate the ER diagram for core entities.',
        'Database Design'
    ), -- David's task.
    (
        3,
        true,
        'Deploy static frontend to S3 bucket.',
        'Frontend Deployment'
    ); -- Emma's task.
