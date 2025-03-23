CREATE TABLE users
(
    user_id           SERIAL PRIMARY KEY,
    email             VARCHAR(254) NOT NULL,
    password          VARCHAR(32)  NOT NULL,
    profile_image_url VARCHAR(255),
    username          VARCHAR(64)  NOT NULL UNIQUE
);

CREATE TABLE tasks
(
    task_id       SERIAL PRIMARY KEY,
    completed     BOOLEAN   DEFAULT FALSE,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description   TEXT,
    title         VARCHAR(255) NOT NULL,

    user_id       INTEGER      NOT NULL,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
            REFERENCES users (user_id)
            ON DELETE CASCADE
);

CREATE TABLE files
(
    file_id     SERIAL PRIMARY KEY,
    file_name   VARCHAR(255) NOT NULL,
    file_type   VARCHAR(128) NOT NULL,
    file_url    VARCHAR(255) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    user_id     INTEGER      NOT NULL,

    CONSTRAINT fk_user_file
        FOREIGN KEY (user_id)
            REFERENCES users (user_id)
            ON DELETE CASCADE
);
