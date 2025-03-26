-- User Accounts
CREATE TABLE account
(
    account_id        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email             VARCHAR(254) NOT NULL UNIQUE,
    password          VARCHAR(60)  NOT NULL,
    profile_image_url VARCHAR(255),
    username          VARCHAR(64)  NOT NULL UNIQUE
);

-- User Files
CREATE TABLE file
(
    file_id     INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    file_name   VARCHAR(255) NOT NULL,
    file_type   VARCHAR(128) NOT NULL,
    file_url    VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    account_id  INTEGER      NOT NULL,

    CONSTRAINT fk_file_account
        FOREIGN KEY (account_id)
            REFERENCES account (account_id)
            ON DELETE CASCADE
);

-- User Tasks
CREATE TABLE task
(
    task_id     INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    completed   BOOLEAN     DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    title       VARCHAR(255) NOT NULL,

    account_id  INTEGER      NOT NULL,

    CONSTRAINT fk_task_account
        FOREIGN KEY (account_id)
            REFERENCES account (account_id)
            ON DELETE CASCADE
);
