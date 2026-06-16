-- Migration: Initial Schema for D1
-- Target: Cloudflare D1 (SQLite)

-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS users (
    telegram_id INTEGER PRIMARY KEY, -- D1/SQLite automatically makes INTEGER PRIMARY KEY a 64-bit signed int (BIGINT equivalent)
    username TEXT,
    is_active INTEGER DEFAULT 1 NOT NULL, -- SQLite handles booleans as 0 or 1
    created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL -- SQLite handles timestamps as ISO-8601 strings
);

-- 2. Create Processed Events Table
CREATE TABLE IF NOT EXISTS processed_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Strict SQLite syntax for auto-incrementing IDs
    rss_guid TEXT UNIQUE NOT NULL,         -- The unique identifier from your RSS item (e.g., GUID or URL)
    title TEXT,
    processed_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 3. Create Indexes
-- SQLite automatically creates an index on UNIQUE columns, so an explicit index on rss_guid isn't strictly required, 
-- but a partial index on active users will speed up your broadcast queries.
CREATE INDEX IF NOT EXISTS idx_users_active ON users(telegram_id) WHERE is_active = 1;