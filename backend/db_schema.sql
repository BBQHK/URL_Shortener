CREATE TABLE access_log(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	shorten_url TEXT NOT NULL,
	ip_addr TEXT NOT NULL,
	access_time TEXT DEFAULT (datetime('now', 'localtime'))
);

CREATE TABLE url_map (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shorten_url TEXT NOT NULL,
    original_url TEXT NOT NULL,
    created_date TEXT DEFAULT (datetime('now', 'localtime'))
);