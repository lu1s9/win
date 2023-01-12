var sqlite3 = require("sqlite3");
var bcrypt = require("bcryptjs");

const db = new sqlite3.Database(process.env.DB);

db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS users ( \
    username TEXT UNIQUE, \
    hashed_password BLOB \
    )"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS menu ( \
      id_menu INTEGER UNIQUE, \
      primer_tiempo TEXT NOT NULL, \
      segundo_tiempo TEXT NOT NULL, \
      tercer_tiempo TEXT NOT NULL \
      )"
  );

  db.run(
    "INSERT OR IGNORE INTO menu (id_menu, primer_tiempo, segundo_tiempo, tercer_tiempo) VALUES (?,?,?,?)",
    [1, "a", "b", "c"]
  );

  bcrypt.hash(process.env.ADMIN_PW, 10, function (err, hash) {
    db.run(
      "INSERT OR IGNORE INTO users (username, hashed_password) VALUES (?, ?)",
      [process.env.DB_USER, hash]
    );
  });
});

module.exports = db;
