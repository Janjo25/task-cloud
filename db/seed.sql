-- Accounts
/*
* The password for each user is their first name in lowercase.
*/
INSERT INTO account (email, password, profile_image_url, username)
VALUES
    (
        'alice.smith@example.com',
        '$2b$12$ivgimkQSUH7ipnCkKQjBye2Oy9zXUas.NcZl5CjdA2YcghvD0IXXq',
        'https://storage.example.com/avatars/alice.png',
        'alice_s'
    ),
    (
        'david.johnson@example.com',
        '$2b$12$moCIz7hEoAerhcu1rtpr/OQ9DZ9rpVMDjlnmTwgU7BNjqlbdCZOCi',
        'https://storage.example.com/avatars/david.png',
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
        'profile-alice.png',
        'image/png',
        'https://storage.example.com/files/profile-alice.png'
    ), -- Alice's file.
    (
        1,
        'auth-specifications.txt',
        'text/plain',
        'https://storage.example.com/files/auth-specifications.txt'
    ), -- Alice's file.
    (
        2,
        'er-diagram-v1.png',
        'image/png',
        'https://storage.example.com/files/er-diagram-v1.png'
    ), -- David's file.
    (
        3,
        'project-manual.pdf',
        'application/pdf',
        'https://storage.example.com/files/project-manual.pdf'
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
