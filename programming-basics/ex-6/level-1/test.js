const config = require("config");

const dbPath = config.get("Application.dbConfig.path");
console.log(dbPath); // ./database.sqlite
