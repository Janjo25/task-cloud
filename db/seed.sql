-- Users
/*
* The password for each user is their first name in lowercase.
*/
INSERT INTO users (email, password, profile_image_url, username)
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

-- Tasks
INSERT INTO tasks (completed, description, title, user_id)
VALUES
    (false, 'Initial database setup with Docker and PostgreSQL.', 'Database Initialization', 1), -- Alice's task.
    (true, 'Implement password hashing with bcrypt.', 'Authentication Setup', 1),                -- Alice's task.
    (false, 'Design and validate the ER diagram for core entities.', 'Database Design', 2),      -- David's task.
    (true, 'Deploy static frontend to S3 bucket.', 'Frontend Deployment', 3);                    -- Emma's task.

-- Files
INSERT INTO files (file_name, file_type, file_url, user_id)
VALUES
    (
        'profile-alice.png',
        'image/png',
        'https://storage.example.com/files/profile-alice.png',
        1
    ), -- Alice's file.
    (
        'auth-specifications.txt',
        'text/plain',
        'https://storage.example.com/files/auth-specifications.txt',
        1
    ), -- Alice's file.
    (
        'er-diagram-v1.png',
        'image/png',
        'https://storage.example.com/files/er-diagram-v1.png',
        2
    ), -- David's file.
    (
        'project-manual.pdf',
        'application/pdf',
        'https://storage.example.com/files/project-manual.pdf',
        3
    ); -- Emma's file.
