require("dotenv").config();
const config = require("config");
const sqlite3 = require("sqlite3").verbose();
const chalk = require("chalk");
const debug = require("debug")("app:index");
const { add, multiply, divide, subtract, logger } = require("./mathUtils");

const env = process.env.NODE_ENV || "default";
console.log(`Current Environment: ${chalk.green(env)}`);

const dbConfig = config.get("dbConfig");

debug(`Loaded DB Path: ${dbConfig.path}`);

const dbPath = dbConfig.path;
const db = new sqlite3.Database(dbPath);

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Error: Provide a command and at least one number.");
  process.exit(1);
}

const operation = args[0];
const numbers = args.slice(1).map((n) => parseFloat(n));

const commands = [];
const getCommands = config.get("commands");

getCommands &&
  getCommands.forEach((command) => {
    try {
      const path = `./${command.file}`;
      const module = require(path);
      commands[command.name] = module[command.function];
      debug(`Loaded command: ${command.name}`);
    } catch (error) {
      debug(`Failed to load command: ${command.name}`);
    }
  });

try {
  let result;
  if (operation === "--add") {
    result = add(numbers);
  } else if (operation === "--multiply") {
    result = multiply(numbers);
  } else if (operation === "--divide") {
    result = divide(numbers);
  } else if (operation === "--subtract") {
    result = subtract(numbers);
  } else if (commands[operation]) {
    // Dynamically call the loaded command
    result = commands[operation](numbers);
  } else {
    throw new Error(`Unsupported command: ${operation}`);
  }

  console.log(`Result: ${result}`);
  logger.info(`Operation: ${operation}, Result: ${result}`);

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS operations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      operation TEXT,
      numbers TEXT,
      result REAL
    )`);
    const stmt = db.prepare(
      "INSERT INTO operations (operation, numbers, result) VALUES (?, ?, ?)"
    );
    stmt.run(operation, JSON.stringify(numbers), result);
    stmt.finalize();

    db.each("SELECT * FROM operations", (err, row) => {
      if (err) {
        logger.error(chalk.red("Error fetching data from the database"));
      } else {
        console.log(row);
      }
    });
  });

  console.log(chalk.green("Operation completed successfully."));
} catch (error) {
  logger.error(`Error: ${error.message}`);
  console.error(chalk.red("Operation failed."));
}

db.close();
