CREATE TABLE IF NOT EXISTS movies (
    _id VARCHAR(40) PRIMARY KEY UNIQUE NOT NULL,
    uid TEXT NOT NULL,
    title TEXT NOT NULL,
    released_at DATE,
    genre TEXT NOT NULL,
    director TEXT NOT NULL,
    created_at BIGINT NOT NULL DEFAULT date_part('epoch'::text, now()),
    updated_at BIGINT NOT NULL DEFAULT date_part('epoch'::text, now())
);